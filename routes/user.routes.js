const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.sendFile( __root + '/public/image-load.html');
})

router.post('/upload-document', async (req, res) => {
    try {
        if (req.files === undefined) {
            return res.status(400).json({ message: 'Не передано ни одного файлы' });
        }
        for (let file_key in req.files) {
            if (!req.files.hasOwnProperty(file_key)) {
                continue;
            }
            let file = req.files[file_key];
            if (!Array.isArray(file)) {
                file = [file];
            }
            file.forEach((file) => {
                file.mv(__root + '/public/files/' + file.name)
            });
        }
        res.status(200).json({ message: 'Все файлы успешно загружены' });
    } catch (e) {
        res.status(500).json({ message: 'Ошибка при загрузке файла' });
        throw e;
    }
})

module.exports = router;