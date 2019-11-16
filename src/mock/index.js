import Mock from 'mockjs';


let navtiveURL = 'http://localhost:5000/api';

Mock.mock(`${navtiveURL}/table/basictable`, 'get', {
  "code": 200,
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

Mock.mock(RegExp(`${navtiveURL}/open_city?.*`), 'get', {
  "code": 200,
  "result": {
    "page": 1,
    "page_size": 10,
    "total_count": 60,
    "page_count": 6,
    "item_list|10": [{
      "id|+1": 1,
      "name": "@city",
      "mode|1-2": 1,
      "op_mode|1-2": 1,
      "franchisee_id": 77,
      "franchisee_name": "松果自营",
      "city_admins|1-2": [{
        "user_name": "@cname",
        "user_id|+1": 10001
      }],
      "open_time": "@datetime",
      "sys_user_name": "@cname",
      "update_time": 1520476737000
    }]
  }
})