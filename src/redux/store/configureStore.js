import reducers from '../reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';

// 初始化 redux 数据
const initValue = {
  menu: {
    menuName: ''
  },
  user: {
    userName: '湖畔一脚'
  }
}

const configureStore = () => createStore(reducers, initValue, devToolsEnhancer());

export default configureStore;