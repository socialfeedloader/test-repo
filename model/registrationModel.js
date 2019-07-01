var mongoose = require('mongoose');

var schema = mongoose.Schema;

var registrationSchema = new schema({
    Fullname: { type: String },
    email: { type: String },
    phone: { type: Number },
    pass: { type: String },
    created_at: { type: Date, default: Date.now }
});

exports.registrationModel = mongoose.model('registrationModel', registrationSchema);