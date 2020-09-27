const {Router} = require('express');
const router = Router();
const User = require('../models/User')(db);
const UserDocument = require('../models/UserDocument')(db);

router.get('/get-document/:id', async (req, res) => {
  return res.status(400).json('success');
})

router.post('/send-document', async (req, res) => {
  try {

    if (req.files === undefined) {
      return res.status(400).json({ message: 'Не передано ни одного файлы' });
    }


    for (let fileKey in req.files) {
      if (!req.files.hasOwnProperty(fileKey)) {
        continue;
      }

      let file = req.files[fileKey];

      if (!Array.isArray(file)) {
        file = [file];
      }

      file.forEach((file) => {
        let userDocument = UserDocument.build({
          user_id: req.body.userId,
          clinic_id: req.body.clinicId,
          document_type_id: req.body.documentTypeId,
          fileResource: file
        });

        userDocument.generateNewFileName().save()
          .then(() => userDocument.uploadDocument()
            .then(res.status(200).json({ message: 'Все файлы успешно загружены' }))
            .catch((error) => {
              res.status(500).json({ message: 'Не удалось загрузить файлы', error: `${error}` });
              throw error;
            })
          )
          .catch((error) => {
            res.status(500).json({ message: 'Не удалось сохранить модель', error: `${error}` });
            throw error;
          });
      });
    }

  } catch (e) {
    res.status(500).json({ message: e });
    throw e;
  }
})

module.exports = router;