import Mock from 'mockjs';


let navtiveURL = 'http://localhost:5000/api';

Mock.mock(`${navtiveURL}/table/basictable`, 'get', {
  code: 200,
  msg: '找不到数据',
  "data|5-30": [
    {
      "id|+1": 1,
      "userName": "@cname",
      "age|16-50": 1,
      "gender|1-2": 1,
      "birthday": '@date',
      "address": "@county(true)",
      "time": "@time"
    }
  ]
})