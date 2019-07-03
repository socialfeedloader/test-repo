var mongoose = require('mongoose');
require('../model/registrationModel.js');
var registrationModel = mongoose.model('registrationModel');

var randomstring = require('randomstring');
var fs = require('fs');
var waterfall = require('async-waterfall');
var ejs = require('ejs');

var communication = require('../communication');
exports.mainFn = function(req, res) {
    res.render('layout', { title: "registrationForm" });
    registrationModel.find({}, function(err, result) {
        res.render('layout', {
            title: "registrationForm",
            result: result
        });
    });
};

exports.saveRegistration = function(req, res) {
    console.log(req.body);
    var token = randomstring.generate({
        length: 150,
        charset: 'alphanumeric'
    });
    waterfall([
        function(callback) {
            req.body.token = token;
            req.body.tokenStatus = false;
            var registrationData = new registrationModel(req.body);
            registrationData.save(function(err, result){
                if(err){
                    console.log('mongodb-error:', err.code);
                    res.json({error: err.code});
                }
                callback(null, result);
            });     
        }
    ], function(err, result){
        if(result==null){
            console.log('null result'); //TODO modify
        }
        console.log('saved-data:',result);
        var str = fs.readFileSync(process.cwd() + '/views/create_password.ejs', 'utf8');
        var emailJSON = {
            'name': req.body.fullName,
            'accessUrl': req.protocol + "://" + req.get('host') + '/create-user-passsword/' + token
        };
        htmlContent = ejs.render(str, emailJSON);
        var mailOptions = {
            recipient: result.email,
            subject: 'Create Your Password',
            html: htmlContent
        };
        communication.sendEmail(mailOptions, function(err, result){
            console.log("sendEmail-result:", result);
        })
    })
    //-------------------------------------------------------
    //var registrationData = new registrationModel(req.body);
    //registrationData.save(function(err, result) {
    //    if (result) {
    //        console.log("Saved Successfully");
    //        res.redirect('/');
    //    }
    //});
};
exports.getUserList = function(req, res) {

    registrationModel.find({}, function(err, result) {
        console.log(result)
        res.status(200).json({ result: result });
    })
    exports.getUserData = function(req, res) {
        registrationModel.findOne({ _id: req.query.id }, function(err, result) {
            res.status(200).json({ result: result });
        })
    }
}