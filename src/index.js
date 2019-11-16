import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Life from './pages/demo/Life';
// import Admin from './admin';

// mock拦截
// import './mock';

// 引入自定义配置 axios
import axios from './config/axiosConfig';
// 前端路由
import IRouter from './router';
import * as serviceWorker from './serviceWorker';

// axios绑定到React
React.Component.prototype.axios = axios;

ReactDOM.render(<IRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
