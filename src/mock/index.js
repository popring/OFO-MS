import Mock from 'mockjs';


let navtiveURL = 'http://localhost:5000';

Mock.mock(`${navtiveURL}/api/table/basictable`, 'get', {
  code: 200,
  msg: '找不到数据',
  "data|5-30": [
    {
      "id|+1": 1,
      "userName": "@cname",
      "age|16-29": 1,
      "gender": ()=>['男', '女'][Number.parseInt(Math.random()*2)],
      "birthday": '@date',
      "address": "@county(true)",
      "time": "@time"
    }
  ]
})