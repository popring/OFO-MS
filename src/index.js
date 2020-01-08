import React from 'react';
import ReactDOM from 'react-dom';

// 前端路由
import App from './App';

// 接口请求绑定到React.Component
import api from './api';
React.Component.prototype.$api = api;

ReactDOM.render(<App />, document.getElementById('root'));