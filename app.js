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

app.get('/', (req, res) => {
  if(req.session && req.session.context) {
      res.sendFile(__dirname + '/index.html');
  } else {
    req.session.context = Math.random().toString(36).substr(2, 5);
    res.sendFile(__dirname + '/index.html');
  }
});

io.on('connect', function(socket) {
      console.log('client-connected');
      socket.on('input', function(res) {
          conversation.message({
            input: {text: res.text},
            workspace_id: `addYourWorkspaceId`
          }, function(err, wRes) {
              if(err) {
                socket.emit('error', {
                  error: err
                });
              } else {
                socket.emit('response', {
                  output: wRes
                });
              }
          })
      });
});
