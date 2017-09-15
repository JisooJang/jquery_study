var express = require('express'); //express 모듈을 추출
var bodyParser = require('body-parser');  // body parser 미들웨어를 추출

var items = [{
  name: '우유',
  price: '2000'
}, {
  name: '홍차',
  price: '5000'
}, {
  name: '커피',
  price: '5000'
}];

var app = express();  //웹 서버를 생성
app.use(express.static('public'));  //static 미들웨어를 사용하여 정적 파일에 대한 폴더 명시 (public)
app.use(bodyParser.urlencoded({ extended: false }));  // 일반적인 URL요청으로 오는 데이터를 자동으로 분해해주는 함수를 리턴하여 미들웨어로 사용

app.get('/products', function (request, response) { // '/products' URL로 get요청이 들어 올 경우
  response.send(items); //응답 객체에 items변수를 전달
});

app.get('/products/:id', function (request, response) { // 데이터 조회
  var id = Number(request.params.id);

  if(isNaN(id)) { //id값이 NaN, 즉 숫자가 아니면
    response.send({
      error: '숫자를 입력하세요!'
    });
  } else if(items[id]) {  // items[id]값이 존재하면
    response.send(items[id]);
  } else {  // items[id]값이 존재하지 않으면
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

app.post('/products', function (request, response) {  // 데이터 추가
    // get 이외의 요청에서는 데이터가 주소에 나타나지 않으므로 body-parser 미들웨어를 사용해 전달되는 데이터를 분해해서 사용
  var name = request.body.name; // body-parser 미들웨어를 사용하여 request 객체의 body 속성 사용 가능
  var price = request.body.price;
  var item = {
    name: name,
    price: price
  };

  items.push(item); // 외부 배열 변수 items에 원소 item을 추가

  response.send({ // 응답 객체에 데이터 추가
    message: '데이터를 추가했습니다.',
    data: item
  });
});

app.put('/products/:id', function (request, response) { // 데이터 수정
  var id = Number(request.params.id);
  var name = request.body.name;
  var price = request.body.price;

  if(items[id]) {
    // 데이터 수정
    if(name) { items[id].name = name; }
    if(price) { items[id].price = price; }

    // 응답 객체에 수정한 데이터 전송
    response.send({
      message: '데이터를 수정했습니다.',
      data: items[id]
    });
  } else {  // 해당 인덱스의 배열 요소가 없을 경우
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

app.del('products/:id', function (request, response) {
  var id = Number(request.params.id); // URL의 id값을 받아와 숫자로 변환

  if(isNaN(id)) { //id값이 숫자가 아니면
    response.send({
      error: '숫자를 입력하세요!'
    });
  } else if (items[id]) { //items배열에 id 인덱스가 존재하면
    items.splice(id, 1);  // splice(항목 삭제 위치, 삭제할 항목 수) => 배열 요소 삭제
    response.send({
      message: '데이터를 삭제했습니다.'
    });
  } else {
    response.send({
      error: '존재하지 않는 데이터입니다!'
    });
  }
});

app.listen(52273, function () { // 웹 서버를 실행합니다.
  console.log('Server Running at http://127.0.0.1:52273');  // = http://localhost:52273 과 같음
});
