var mongoose = require('mongoose');
require('../model/registrationModel.js');
var registrationModel = mongoose.model('registrationModel');

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
    var registrationData = new registrationModel(req.body);
    registrationData.save(function(err, result) {
        if (result) {
            console.log("Saved Successfully");
            res.redirect('/');
        }
    });
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