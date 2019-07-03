var mongoose = require('mongoose');

var schema = mongoose.Schema;

var registrationSchema = new schema({
    fullname: { type: String },
    email: { type: String, unique: true},
    phone: { type: Number },
    token: { type: String },
    tokenStatus: { type: Boolean },
    isActive: { type: Boolean, default: false},
    password: { type: String },
    created_at: { type: Date, default: Date.now }
});

exports.registrationModel = mongoose.model('registrationModel', registrationSchema);