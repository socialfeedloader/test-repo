var mongoose = require('mongoose');
//var sleep = require('sleep');
require('../model/registrationModel.js');
var registrationModel = mongoose.model('registrationModel');

var randomstring = require('randomstring');
var fs = require('fs');
var waterfall = require('async-waterfall');
var ejs = require('ejs');
var path = require('path');

var communication = require('../communication');

exports.mainFn = function(req, res) {
    // res.render('layout', { title: "registrationForm" });
    // registrationModel.find({}, function(err, result) {
    //     res.render('layout', {
    //         title: "registrationForm",
    //         result: result
    //     });
    // });
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
            //sleep.msleep(3000); // make the server delay
            registrationData.save(function(err, result){
                if(err){
                    console.log('mongodb-error:', err.code);
                    res.json({error: err.code});
                }else{
                    callback(null, result);
                }
            });     
        }
    ], function(err, result){
        res.setHeader('content-type', 'application/json');
        res.json({result:result});
        if(result==null){
            console.log('null-result-from-db, data not saved');
        }else{
            console.log('saved-data:',result);
            var str = fs.readFileSync(process.cwd() + '/views/create_password.ejs', 'utf8');
            var emailJSON = {
                'name': req.body.fullName,
                //'accessUrl': req.protocol + "://" + req.get('host') + '/create-user-passsword/' + token
                'accessUrl': req.protocol + "://" + req.get('host') + '/create-user-password/?token=' + token
            };
            htmlContent = ejs.render(str, emailJSON);
            var mailOptions = {
                recipient: result.email,
                subject: 'Create Your Password',
                html: htmlContent
            };
            communication.sendEmail(mailOptions, function(err, result){
                if(!err){
                    console.log("sendEmail-result:", result);
                }
                else{
                    console.log("sendMail-error",err);
                }
            })
        }
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

exports.createUserPassword = function(req, res){
    console.log('token:',req.query.token)
    registrationModel.findOne({ token: req.query.token }, { password: 0 }, function(err, result) {
        if (result == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else if (result.tokenStatus == true || result.tokenStatus == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else {
            //res.status(200).json({ result: result });
            res.sendFile(path.resolve('./public' + '/index.html'));
        }
    });
}

exports.getUserList = function(req, res) {

    // registrationModel.find({}, function(err, result) {
    //     console.log(result)
    //     res.status(200).json({ result: result });
    // })
    // exports.getUserData = function(req, res) {
    //     registrationModel.findOne({ _id: req.query.id }, function(err, result) {
    //         res.status(200).json({ result: result });
    //     })
    // }
}