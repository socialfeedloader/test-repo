module.exports = function(app) {
    var mainController = require('../controller/main');
    app.get('/', mainController.mainFn);
    app.post('/saveRegistration', mainController.saveRegistration);
    app.get('/create-user-password', mainController.createUserPassword);
    app.post('/savePassword', mainController.savePassword);
    app.get('/getUserList', mainController.getUserList);
    app.post('/login', mainController.login);
};