/**
 * action 类型
 */

export const type = {
  SWITCH_MENU: 'SWITCH_MENU',
  USER_LOGIN: 'USER_LOGIN'
};

export const userLogin = (userInfo: any) => {
  return {
    type: type.USER_LOGIN,
    userInfo
  };
};
