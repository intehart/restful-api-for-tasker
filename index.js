global.__root = __dirname;

const express = require('express');
const { Sequelize } = require('sequelize');
const db_config = require(__root + '/config/db-config.json');
const session = require('express-session');
const redis = require('redis');
const redisStorage = require('connect-redis')(session)

const app = express();
const environment = "development";
const PORT = 5021;
const client = redis.createClient();

global.db = new Sequelize(db_config[environment]);

//connect file uploader
app.use(require('express-fileupload')({
  createParentPath: true
}));

app.use(express.json({ extended: true }));

app.use(session({
  store: new redisStorage({
    host: '127.0.0.1',
    port: 6379,
    client: client
  }),
  secret: 'uniquesecretKey',
  saveUninitialized: true,
  resave: false
}));

//connect routes handler map
require('./routes/routesMapper')(app);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log('Server Error: ' + e.message);
        process.exit(1);
    }
}

start();