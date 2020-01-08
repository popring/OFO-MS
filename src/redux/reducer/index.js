/**
 * reducer
 */

import { combineReducers } from 'redux';

import menu from './menu';
import userInfo from './userInfo';

export default combineReducers({
  menu,
  userInfo
})
