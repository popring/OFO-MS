import reducers from '../reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';

// 初始化 redux 数据
const initValue = {
  userInfo: {
    userName: null,
    token: null
  }
};

const configureStore = () => createStore(reducers, initValue, devToolsEnhancer({}));

export default configureStore;
