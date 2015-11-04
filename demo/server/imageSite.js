#!/bin/env node
'use strict';
var iplocal = 'localhost';
var portlocal = '3300';
var apiUrl = '/api';
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// serve the files out of ./public as our main files
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 3600*24 //过期时间
    }
}));

//需要权限的都在这里
var upload = multer({
    dest: 'upload/'
});
app.post(path.join(apiUrl,'upload'),cors({origin: 'http://localhost:3000'}),upload.single('file'), function(req, res) {
    var tmp_path = req.file.path;
    var target_path = './uploads/' + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    //记得删除缓存文件
    src.on('end', function() {
        setTimeout(function () {
            res.send('/uploads/' + req.file.originalname);
        },4000);
        console.log('completeeeee');
        fs.unlinkSync(req.file.path);
    });
    src.on('error', function(err) {
        res.sendStatus(500);
        console.log('erroooor');
    });
});


// start server on the specified port and binding host
app.listen(portlocal, iplocal, function() {
    // print a message when the server starts listening
    console.log('server starting on mad.wiki');
});