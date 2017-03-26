var express = require('express');
var watsonConvo = require('watson-developer-cloud/conversation/v1');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');

app.use(session({
    secret: 'G Fckin G',
    resave: false,
    saveUninitialized: true
}));

var conversation = new watsonConvo({
  username: 'addYourUsername',
  password: 'addYourPassword',
  version_date: watsonConvo.VERSION_DATE_2017_02_03
});
