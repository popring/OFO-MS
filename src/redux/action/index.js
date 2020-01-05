/**
 * action 类型
 */

export const type = {
  SWITCH_MENU: 'SWITCH_MENU',
  USER_NAME: 'USER_NAME'
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