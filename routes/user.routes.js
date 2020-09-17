const {Router} = require('express');
const router = Router();
const User = require('../models/User')(db);
const UserDocument = require('../models/UserDocument')(db);

router.get('/', async (req, res) => {
  res.sendFile( __root + '/public/image-load.html');
})

router.get('/get-document/:id', async (req, res) => {
  return res.status(400).json('success');
})

router.post('/upload-document', async (request, responce) => {
  try {

    if (request.files === undefined) {
      return responce.status(400).json({ message: 'Не передано ни одного файлы' });
    }


    for (let fileKey in request.files) {
      if (!request.files.hasOwnProperty(fileKey)) {
        continue;
      }

      let file = request.files[fileKey];

      if (!Array.isArray(file)) {
        file = [file];
      }

      file.forEach((file) => {
        let userDocument = UserDocument.build({
          user_id: request.body.userId,
          clinic_id: request.body.clinicId,
          document_type_id: request.body.documentTypeId,
          fileResource: file
        });

        userDocument.generateNewFileName().save()
          .then(() => userDocument.uploadDocument()
            .then(responce.status(200).json({ message: 'Все файлы успешно загружены' }))
            .catch((error) => {
              responce.status(500).json({ message: 'Не удалось загрузить файлы', error: `${error}` });
              throw error;
            })
          )
          .catch((error) => {
            responce.status(500).json({ message: 'Не удалось сохранить модель', error: `${error}` });
            throw error;
          });
      });
    }

  } catch (e) {
    responce.status(500).json({ message: e });
    throw e;
  }
})

module.exports = router;