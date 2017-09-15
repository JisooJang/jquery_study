var express = require('express'); //express 모듈을 추출
var app = express();  //웹 서버를 생성

app.use(express.static('public'));


app.all('/a', function (request, response) {
  response.send('<h1>Page A</h1>');
});

app.all('/b', function (request, response) {
  response.send('<h1>Page B</h1>');
});

app.all('/c', function (request, response) {
  response.send('<h1>Page C</h1>');
});

app.listen(52273, function () { // 웹 서버를 실행
  console.log('Server Running at http://127.0.0.1:52273');
});
