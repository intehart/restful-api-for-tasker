module.exports = (app) => {
    app.use('/api/auth', require('./auth.routes'));
    app.use('/api/user', require('./user.routes'));
}