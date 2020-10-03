module.exports = (app) => {
    app.use('/auth', require('./auth.routes'));
    app.use('/user', require('./user.routes'));
}