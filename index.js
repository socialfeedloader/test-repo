const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path');

var app = express();
var adminRouter = express.Router();

app.use(cors());
adminRouter.use(cors());

var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(express.static(__dirname + '/public'));


require('./routes/routes')(app, adminRouter);
require('./database/db');



app.route('/*').get(function(req, res) {
    res.sendFile(path.resolve('./public' + '/index.html'));
});

adminRouter.route('/*').post(function(req, res) {
    res.sendFile(path.resolve('./public' + '/index.html'));
})

app.use('/adminApi', adminRouter);

var port= 3000;
server.listen(port, function() {
    console.log('Server is listening on port ' + port);
})