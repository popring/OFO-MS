This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 小黄车后台管理系统

继个人学习项目，请多指教。

## Projects

前端网页的链接： https://github.com/popring/ImoocManager 

后端接口的链接： https://github.com/popring/imoocManagerAPI 

## Feature

API接口统一管理 [具体代码](./src/api/index.js)

[拆分组件](#Components)

- 页面的顶部，左导航，底部 拆分为组件
- 表格筛选条件表单抽离 
- 表格渲染抽离

## TODO
1. 权限配置，使用mock配置返回
3. 添加新功能，将订单数据以表格的形式导出。 js-xlsx
## Using

[create-react-app](https://www.npmjs.com/package/create-react-app)

[react](https://zh-hans.reactjs.org/)

[Ant-Design](https://ant.design/)

[Mock.js](http://mockjs.com/)

[moment](https://momentjs.com/)

[百度地图api](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html)

## Installation

```bash
git clone https://github.com/popring/ImoocManager.git

cd ./ImoocManager
```

使用 yarn 或 npm 安装包 (个人使用yarn)，然后启动它

```bash
yarn

yarn start
```

访问地址：[http://localhost:3000/#/admin/home](http://localhost:3000/#/admin/home)

后台接口：http://127.0.0.1:5000/api

### Structure

```bash
│ .gitignore
│ package.json
│ yarn.lock				
│ README.md				# README
├─config				# 项目整体相关配置文件
├─public				# 公共资源文件
│  ├─assets
│  └─gallery
├─scripts				# 脚本文件
└─src					# 源码
    ├─axios				# axios请求拦截(mock.js)
    ├─components		# 公共组件部分
    ├─config			# axios请求配置，权限配置
    ├─pages				# 各个页面的组件
    │  ├─demo			# demo菜单内的各个页面
    │  ├─form			# ...
    │  ├─Home
    │  ├─Login
    │  ├─nomatch
    │  ├─table
    │  └─ui
    ├─resource			# 资源文件
    ├─style					# 相关公共样式和初始化配置样式
    └─utils					# create-react-app 默认生成
```


##  Update Log 
2019年11月16日16:56:11

1. 后端接口改用 koa创建生成mock数据。

2. `/admin/city`开通城市的筛选条件，传递给后端，点击切换页数，网页中的UI组件分页按钮没有切换的原因是，使用mock的数据返回的参数`page`一直为`1`，而UI组件根据返回的page切换分页按钮，也是为1，这就是分页按钮没有切换的原因。

2019年11月22日21:54:48

1. 项目工程化, 抽离表格筛选条件组件为公共组件

2. 抽离api，统一管理api

3. 将表格封装，表格数据请求封装

## Components use

### Table

**src\components\Table\index.js**

> 在 antd 基础之上 二次封装的table组件，支持antd的属性。

#### 优点

- 自带 **loading** 效果
- 自动分页功能
- 提供api，列表，就可将数据渲染出来

#### 使用方法

> 只需传入两个参数即可渲染，为了遵循 `React` 规范， 还要传入rowKey，来区分每一行

```js
import React, { Component } from 'react';
import { Card } from 'antd';
import Table from '@/components/Table';

export default class user extends Component {
	
  // 将Table对象绑定在 this.child 上，使用筛选表单组件会用到
  onRef = (ref) => {
    this.child = ref;
  }
  
  render() {
    const columns = [
      { title: '城市ID', dataIndex: 'id', key: 'id' },
      { title: '授权加盟商', dataIndex: 'franchisee_name', key: 'franchisee_name' },
      { title: '城市开通时间', dataIndex: 'open_time', key: 'open_time' },
      { title: '操作时间', dataIndex: 'update_time', key: 'update_time' },
      { title: '操作人', dataIndex: 'sys_user_name', key: 'sys_user_name' }
    ];
    return (
      <div>
        <Card>
          <Table
      			onRef={this.onRef}
            rowKey='id'
            apiGetList={this.$api.openCity}
            columns={columns}
          />
        </Card>
      </div>
    )
  }
}
```

### FilterForm

**src\components\BaseForm\index.js**

> 在 antd 基础之上 二次封装的表单组件

#### 使用方法

> 将需要使用的组件以对象的形式传入

```js
import React, { Component } from 'react';
import { Card } from 'antd';
import BaseForm from '@/components/BaseForm';

export class User extends Component {
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      placeholder: '全部',
      initialValue: '0',
      style: { width: 120 },
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },
    {
      type: 'RANGEDATE'
    },
  ]

  render() {
    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
          />
        </Card>
      </div>
    );
  }
}

export default User;
```



