import Mock from 'mockjs';

let rootURL = 'http://localhost:5000';

Mock.mock(`${rootURL}/api/table/basictable`, 'get', {
  "data|5-30": [
    {
      "id|1-1000": 1,
      "userName": "@cname",
      "age|16-29": 1,
      "gender": ()=>['男', '女'][Number.parseInt(Math.random()*2)],
      "birthday": '@date',
      "address": "@county(true)",
      "time": "@time"
    }
  ]
})