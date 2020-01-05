/**
 * user reducer
 */
import { type } from '../action';

const User = (state = {}, action) => {
  switch (action.type) {
    case type.USER_NAME:
      return {
        ...state,
        userName: action.userName
      }
    default:
      return { ...state };
  }
}

export default User;