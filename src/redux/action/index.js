/**
 * action 类型
 */

export const type = {
  SWITCH_MENU: 'SWITCH_MENU',
  USER_NAME: 'USER_NAME',
  USER_LOGIN: 'USER_LOGIN'
}

export const switchMenu = (menuName) => {
  return {
    type: type.SWITCH_MENU,
    menuName: menuName
  }
}

export const userName = (userName) => {
  return {
    type: type.USER_NAME,
    userName
  }
}

export const userLogin = (userInfo) => {
  return {
    type: type.USER_LOGIN,
    userInfo
  }
}