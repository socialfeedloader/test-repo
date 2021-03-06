var request = require('request');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var senderEmail = 'socialfeed1234@gmail.com'; // add sender's email address
var senderPass = 'socialfeed64797'; // add your password

var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: senderEmail, 
        pass: senderPass 
    }
}));

module.exports = {
    sendEmail: function(data, callback){
        var mailOptions = {
            from: senderEmail,
            to: data.recipient,
            subject: data.subject,
            html: data.html
        };
        transport.sendMail(mailOptions, function(error, info){
            callback(error, info);
        });
    },
}