const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    path = require('path');
var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));

app.route('/*').get(function(req, res) {
    res.sendFile(path.resolve('./public' + '/index.html'));
});

var port = 3000;
server.listen(port, function() {
    console.log('server is running on port ' + port);
})