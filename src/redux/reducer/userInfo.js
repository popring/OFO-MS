/**
 * user reducer
 */
import { type } from '../action';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case type.USER_NAME:
      return {
        ...state,
        userName: action.userName
      }
    case type.USER_LOGIN:
      return {
        ...state,
        userName: action.userInfo.userName,
        token: action.userInfo.token,
      }
    default:
      return { ...state };
  }
}

export default userInfo;