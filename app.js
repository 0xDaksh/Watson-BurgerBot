var express = require('express');
var watsonConvo = require('watson-developer-cloud/conversation/v1');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');
