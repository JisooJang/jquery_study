var express = require('express'); //express 모듈을 추출
var app = express();  //웹 서버를 생성

app.use(function (request, response, next) {  // 미들웨어 : 사용자가 서버에 접속하면 자동으로 실행되는 request 이벤트 리스너
  console.log('first');
  next();
});

app.use(function (request, response, next) {  // 매개변수 next는 다음 콜백함수를 의미 
  console.log('second');
  next();
});

app.use(function (request, response, next) {
  response.send('<h1>안녕하세요</h1>');
});

app.listen(52273, function () { // 웹 서버를 실행
  console.log('Server Running at http://127.0.0.1:52273');
});
