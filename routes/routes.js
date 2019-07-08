module.exports = function(app, adminRouter) {
    var mainController = require('../controller/main');
    app.get('/', mainController.mainFn);
    app.post('/saveRegistration', mainController.saveRegistration);
    app.get('/create-user-password', mainController.createUserPassword);
    app.post('/savePassword', mainController.savePassword);
    //app.get('/getUserList', mainController.getUserList);
    app.post('/login', mainController.login);

    adminRouter.use(function(req, res, next){
        var jwt = require('jsonwebtoken');
        var secretKey = 'SRCEukzwWJybZkUpHVdA5PtdkFvWPmddyUwtb2';
        console.log('verifying authorization');
        console.log('authorization:', req.headers.authorization);
        var token = req.headers.authorization;
        jwt.verify(token, secretKey, function(err, decoded){
            if(err){
                res.status(400).json('Invalid Request');
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    })

    adminRouter.post('/changePassword', mainController.changePassword);
};