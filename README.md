This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 小黄车后台管理系统

继个人学习项目，请多指教。

## TODO
1. 权限配置，使用mock配置返回
2. 线上 `easy-mock`间歇性的歇菜，转战本地部署 `easy-mock`
## Using

[create-react-app](https://www.npmjs.com/package/create-react-app)

[react](https://zh-hans.reactjs.org/)

[Ant-Design](https://ant.design/)

[Mock.js](http://mockjs.com/)

[moment](https://momentjs.com/)

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

```bash
npm i

npm run start
```

访问地址：[http://localhost:3000/#/admin/home](http://localhost:3000/#/admin/home)

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


## 更新日志
2019年11月4日10:44:02
将主面板的时间显示切换为使用moment实现



2019年11月11日11:52:44

1. 修改调试接口为 4000
2.  `/admin/city`开通城市的筛选条件，传递给后端，点击切换页数，网页中的UI组件分页按钮没有切换的原因是，使用mock的数据返回的参数`page`一直为`1`，而UI组件根据返回的page切换分页按钮，也是为1，这就是分页按钮没有切换的原因。
3. 网站底部版权添加，项目启动时间计时
4. 添加城市管理页面



