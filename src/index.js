import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Life from './pages/demo/Life';
// import Admin from './admin';

// mock拦截
// import './mock';

// 前端路由
import IRouter from './router';
import * as serviceWorker from './serviceWorker';

// 接口请求绑定到React.Component
import api from './api';
React.Component.prototype.$api = api;

ReactDOM.render(<IRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
