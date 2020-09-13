const express = require('express');
const app = express();
const PORT = 5020;
global.__root = __dirname;

//connect file uploader
app.use(require('express-fileupload')())

app.use(express.json({ extended: true }));

//connect routes handler map
require('./routes/routesMapper')(app);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log('Server Error: ' + e.message);
        process.exit(1)
    }
}

start();