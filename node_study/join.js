var express = require('express'); //express 모듈을 추출
var bodyParser = require('body-parser');  // body parser 미들웨어를 추출


var app = express();  //웹 서버를 생성
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (request, response) {
    res.render('index.html');
});

app.get('/join', function (request, response) {

});

app.post('/login', function (request, response) {
  var id = request.body.id;
  var password = request.body.password;
});
