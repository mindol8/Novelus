var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000); //포트 지정
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',__dirname + '/views');
app.set('views engin','ejs');
app.engine('html',require('ejs').renderFile);

var router = express.Router();
app.use('/', router);

app.use(function (req, res) {
    res.render('index.ejs');
})

http.createServer(app).listen(app.get('port'),  function () {
    console.log("익스프레스로 웹 서버를 실행함 : " + app.get('port'));
}) //express를 이용해 웹서버 만든다