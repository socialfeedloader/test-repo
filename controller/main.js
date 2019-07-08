var mongoose = require('mongoose');
require('../model/registrationModel.js');
var registrationModel = mongoose.model('registrationModel');

var randomstring = require('randomstring');
var fs = require('fs');
var waterfall = require('async-waterfall');
var ejs = require('ejs');
var path = require('path');
var jwt = require('jsonwebtoken');
var secretKey = 'SRCEukzwWJybZkUpHVdA5PtdkFvWPmddyUwtb2';
var bcrypt = require('bcrypt-nodejs');

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
                'accessUrl': req.protocol + "://" + req.get('host') + '/create-user-password/' + token
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

exports.createUserPassword = function(req, res) {
    registrationModel.findOne({ token: req.query.token }, { password: 0 }, function(err, result) {
        if (result == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else if (result.tokenStatus == true || result.tokenStatus == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else {
            //console.log('createUserPassword-result:',result);
            res.status(200).json({ result: result });
            //res.sendFile(path.resolve('./public' + '/index.html'));
        }
    });
}

exports.savePassword = function(req, res){
    //console.log('passwords:',req.body);
    //console.log('token:',req.body.token);
    //console.log('password:',req.body.password);
    var hashPassword = bcrypt.hashSync(req.body.password);
    registrationModel.updateOne({'token':req.body.token}, {
        $set: {
            "password": hashPassword,
            "tokenStatus": true //TODO
        }
    }, function(updateErr, updateResult) {
        if(!updateErr){
            console.log('password-saved-successfully:', updateResult);
            res.json({ message: "password-saved-successfully"});
        }else{
            res.json({ message: "password-was-not-saved"});
            console.log('password-save-error:', updateErr);
        }
    })   
}

exports.login = function(req, res) {
    console.log('login-data:',req.body);
    registrationModel.findOne({ 'email': req.body.email }, function(err, result) {
        if (result) {
            console.log('login-db-result:', result);
            if (result.tokenStatus) {
                var checkPassword = bcrypt.compareSync(req.body.password, result.password);
                console.log(checkPassword);
                if (checkPassword) {
                    console.log("checkPassword:", checkPassword);
                    var jwtObj = {
                        _id: result._id
                    };
                    var token = jwt.sign(jwtObj, secretKey, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).json({ token: token, username : result.fullname });
                } else {
                    res.status(401).send({ message: 'The username and password you entered don\'t match!' });
                }
            } else {
                res.status(401).json({ message: 'Sorry, Server doesn\'t recognize that username!' });
            }
        } else {
            res.status(500).json({ message: 'Server problem, please try again' });
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

exports.changePassword = function(req, res){
    console.log('trying hard');
    //console.log('try',req);
    //console.log('authorization:',req.body.token);
     var decoded = jwt.verify(req.body.token, secretKey);
    // console.log(decoded);
    // //-----------------------------------------------------
    // // registrationModel.findById({'_id' : decoded._id} , function (err, user) {
    // //     if (err) {
    // //         res.status(500).send(err);
    // //     } else {
    // //         user.password = req.body.newPassword || user.password;
    // //         user.save(function (err, user) {
    // //             res.send({success: true, user: user.withoutPassword()});
    // //         });
    // //     }
    // // });
    // //------------------------------------------------------
     var hashPassword = bcrypt.hashSync(req.body.password);
     registrationModel.updateOne({'_id':decoded._id}, {
         $set: {
             "password": hashPassword,
             "tokenStatus": true //TODO
         }
     }, function(updateErr, updateResult) {
         if(!updateErr){
             console.log('new-password-saved-successfully:', updateResult);
             res.json({ message: "new-password-saved-successfully"});
         }else{
             res.json({ message: "new-password-was-not-saved"});
             console.log('new-password-save-error:', updateErr);
         }
     })
}