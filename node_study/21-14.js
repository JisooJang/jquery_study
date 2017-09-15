var express = require('express'); //express 모듈을 추출
var app = express();  //웹 서버를 생성

app.use(express.static('public'));
app.use(function (request, response) {
  response.send('<h1>Hello Middleware .. !</h1>')
});

app.listen(52273, function () { // 웹 서버를 실행
  console.log('Server Running at http://127.0.0.1:52273');
});
