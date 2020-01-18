export interface IMenuBase {
  path: string;
  title: string;
  component?: any;
  icon?: string;
  requireAuth?: boolean;
}

export interface IMenu extends IMenuBase {
  subs?: IMenu[];
}

export const menus: {
  menus: IMenu[];
  others: IMenu[];
  [index: string]: any;
} = {
  menus: [
    { path: '/app/home', component: 'Home', title: '首页', icon: 'user' },
    { path: '/app/demo', component: 'Demo', title: 'demo', icon: 'mobile' },
    {
      path: '/app/ui',
      title: 'ui',
      icon: 'bulb',
      subs: [
        { path: '/app/ui/buttons', component: 'Button', title: 'button', icon: 'border' },
        { path: '/app/ui/modals', component: 'Modal', title: 'modals', icon: 'bell' },
        {
          path: '/app/ui/notification',
          component: 'Notification',
          title: 'Notification',
          icon: 'info-circle'
        },
        { path: '/app/ui/loadings', component: 'Loading', title: 'loading', icon: 'exclamation-circle' },
        { path: '/app/ui/messages', component: 'Message', title: 'Messages', icon: 'minus-circle' },
        { path: '/app/ui/carousel', component: 'Carsouse', title: 'Carousel', icon: 'close-circle' },
        { path: '/app/ui/tabs', component: 'Tabs', title: 'Tabs', icon: 'bell' }
        // { path: '/app/ui/gallery', component: 'Gallery', title: 'Gallery', icon: 'bell' },
      ]
    },
    {
      path: '/app/form',
      title: '表单',
      icon: 'bulb',
      subs: [
        { path: '/app/form/login', component: 'FormLogin', title: 'FormLogin' },
        { path: '/app/form/reg', component: 'FormRegister', title: 'FormRegister' }
      ]
    },
    {
      path: '/app/table',
      title: 'Table',
      icon: 'bulb',
      subs: [
        { path: '/app/table/basic', component: 'BasicTable', title: 'BasicTable' },
        { path: '/app/table/high', component: 'HeightTable', title: 'HeightTable' }
      ]
    }
  ],
  others: []
};
