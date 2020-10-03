const {Router} = require('express');
const User = require('../models/User')(db);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = Router();
const {check, validationResult} = require('express-validator');

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
    check('username', 'Минимальная длина логина 3 символов').isLength({min: 3}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        });
      }

      const {email, username, password} = req.body;

      const candidate = await User.findOne({
        where: {
          email: email
        }
      });

      if (candidate) {
        return res.status(409).json({message: 'Такой пользователь уже зарегистрирован'});
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const authToken = jwt.sign(
        { username: username },
        hashPassword,
        { expiresIn: '1h' }
      );

      const user = new User({
        email: email,
        username: username,
        password: hashPassword,
        auth_token: authToken
      });

      await user.save()
        .then(result => {
          res.status(201).json({message: 'Пользователь создан'});
          req.session.sessionID = authToken;
        })
        .catch(result => {
          res.status(500).json({message: 'Не удалось создать пользователя'});
          throw result;
        });
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

router.post(
  '/login',
  [
    check('email', 'Введите корректные email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
    check('username', 'Введите имя пользователя').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {email, username, password} = req.body;

      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(404).json({ message: 'Такого пользователя не существует' });
      }

      const hashPassword = user.password;

      const isMatch = await bcrypt.compare(password, hashPassword);

      if (!isMatch || user.username !== username) {
        return res.status(400).json({ message: 'Неверно введено имя пользователя или пароль' })
      }

      const token = jwt.sign(
        { username: username },
        hashPassword,
        { expiresIn: '1h' }
      );
      req.session.sessionID = token;
      res.status(200).json({ token , userId: user.id });
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так'});
    }
  });

router.get('/logout', async (req, res) => {
  try {
    res.status(200).json({message: req.session.sessionID});
    req.session.destroy();
  } catch (e) {
    res.status(200).json({message: e});
    throw e;
  }
});

module.exports = router;