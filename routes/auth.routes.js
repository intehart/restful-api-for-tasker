const {Router} = require('express');
const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = Router();
const {check, validationResult} = require('express-validator');

router.post(
    '/register',
    [
        check('email', 'Некорректный mail').isEmail(),
        check('password', 'Минимальная длина пароля 12 символов')
            .isLength({min: 12})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже зарегистрирован'})
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email, password: hashPassword
        });
        await user.save();

        res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
});

router.post(
    '/login',
    [
        check('email', 'Введите корректные email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
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

        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Нет такого пользователя' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Не правильно введен пароль' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { exportsIn: '1h' }
        )

        res.json({ token, userId: user.id })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
});

module.exports = router;