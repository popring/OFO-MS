This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# 小黄车后台管理系统 ts版本

本项目有 `js` 版本，请切换至分支 [ofo-ms-js](https://github.com/popring/ofo-ms/tree/ofo-ms-js)

## Future

- [ ] 登陆功能
- [ ] 权限管理
- [ ] 视图兼容移动端
- [ ] d3.js 实时渲染 武汉疫情状况
- [ ] NProgress 加载进度条

## Bug - TODO

- [ ] 多级菜单内点击面包屑导航返回空页面
- [x] 菜单 icon
- [ ] 路由跳转过渡动画优化
- [ ] `ofo-ms-js` 分支 更正 `README` ，`git` 地址

## Explanation

主分支默认为 `ts` 版本，去除 `js` 版本以下功能

- `Echarts` 相关可视化图形
- 地图相关页面

新增

- 动态生成路由，增加路由的可 `DIY` 性
- 路由切换过渡动画
- 路由，组件， `API` 定义统一出口
- 配置 `i18` ，修改默认为中文

## Feature

API接口统一管理 [具体代码](./src/api/index.js)

[拆分组件](#Components)

- 页面的顶部，左导航，底部 拆分为组件
- 表格筛选条件表单抽离 
- 表格渲染抽离

## Using

[create-react-app](https://www.npmjs.com/package/create-react-app)

[react](https://zh-hans.reactjs.org/)

[Ant-Design](https://ant.design/)

[axios](https://www.axios.com)



无需将 `create-react-app` 解包，添加自定义配置

[react-app-rewired](https://www.npmjs.com/package/react-app-rewired)

[customize-cra](https://www.npmjs.com/package/customize-cra)



`react` 过渡动画

[react-transition-group](https://reactcommunity.org/react-transition-group/)

[animate.css](https://www.npmjs.com/package/animate.css)

## Installation

```bash
git clone https://github.com/popring/ofo-ms.git

cd ./ofo-ms
```

使用 yarn 或 npm 安装包 (个人使用yarn)，然后启动它

```bash
yarn

yarn start
```

访问地址：[http://localhost:3000/

