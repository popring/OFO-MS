export interface IMenu {
  path: string;
  breadcrumbName: string;
  component?: any;
  icon?: string;
  requireAuth?: boolean;
  children?: IMenu[];
}

export const menus: {
  menus: IMenu[];
  others: IMenu[];
  [index: string]: any;
} = {
  menus: [
    { path: '/app/home', component: 'Home', breadcrumbName: 'Home', icon: 'user' },
    { path: '/app/demo', component: 'Demo', breadcrumbName: 'demo', icon: 'form' },
    {
      path: '/app/ui',
      breadcrumbName: 'ui',
      icon: 'bulb',
      children: [
        { path: '/app/ui/buttons', component: 'Button', breadcrumbName: 'button', icon: 'border' },
        { path: '/app/ui/modals', component: 'Modal', breadcrumbName: 'modals', icon: 'bell' },
        {
          path: '/app/ui/notification',
          component: 'Notification',
          breadcrumbName: 'Notification',
          icon: 'info-circle'
        },
        { path: '/app/ui/loadings', component: 'Loading', breadcrumbName: 'loading', icon: 'reload' },
        { path: '/app/ui/messages', component: 'Message', breadcrumbName: 'Messages', icon: 'minus-circle' },
        { path: '/app/ui/carousel', component: 'Carsouse', breadcrumbName: 'Carousel', icon: 'close-circle' },
        { path: '/app/ui/tabs', component: 'Tabs', breadcrumbName: 'Tabs', icon: 'bell' }
        // { path: '/app/ui/gallery', component: 'Gallery', title: 'Gallery', icon: 'bell' },
      ]
    },
    {
      path: '/app/form',
      breadcrumbName: '表单',
      icon: 'form',
      children: [
        { path: '/app/form/login', component: 'FormLogin', breadcrumbName: 'FormLogin', icon: 'form' },
        { path: '/app/form/reg', component: 'FormRegister', breadcrumbName: 'FormRegister', icon: 'form' }
      ]
    },
    {
      path: '/app/table',
      breadcrumbName: 'Table',
      icon: 'table',
      children: [
        { path: '/app/table/basic', component: 'BasicTable', breadcrumbName: 'BasicTable', icon: 'table' },
        { path: '/app/table/high', component: 'HeightTable', breadcrumbName: 'HeightTable', icon: 'table' }
      ]
    },
    {
      path: '/app/outbreak',
      breadcrumbName: '实时疫情',
      icon: 'experiment',
      children: [{ path: '/app/outbreak/wh', component: 'OutbreakWh', breadcrumbName: '武汉', icon: 'bar-chart' }]
    },
    {
      path: '/app/city',
      breadcrumbName: 'city',
      component: 'City',
      icon: 'message'
    },
    { path: '/app/order', component: 'Order', breadcrumbName: 'Order', icon: 'property-safety' },
    { path: '/app/user', component: 'User', breadcrumbName: 'User', icon: 'usergroup-add' },
    { path: '/app/rich', component: 'Rich', breadcrumbName: 'Rich', icon: 'edit' },
    { path: '/app/NoMatch', component: 'NoMatch', breadcrumbName: 'NoMatch' }
  ],
  others: []
};
