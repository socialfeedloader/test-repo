module.exports = function(app) {
    var mainController = require('../controller/main');
    app.get('/', mainController.mainFn);
    app.post('/saveRegistration', mainController.saveRegistration);
    app.get('/getUserList', mainController.getUserList);
};