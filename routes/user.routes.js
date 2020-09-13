const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.sendFile( __dirname + '/public/image-load.html')
})


router.post('/upload-document', async (req, res) => {
    try {
        if (req.files === undefined) {
            return res.status(500).json({ message: 'Не найдены файлы' })
        }
        let file = req.files.file;
        console.log(file)
        file.mv('./public/files/' + file.name,  () =>
            res.status(500).json({ message: 'Не удалось переместить файл' })
        )
        res.status(201).json({ message: 'OK' })
    } catch (e) {
        res.status(500).json({ message: 'Ошибка при загрузке файла' })
        throw e
    }
})

module.exports = router;