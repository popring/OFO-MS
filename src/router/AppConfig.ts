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
        { path: '/app/ui/modals', component: 'Modals', title: 'modals', icon: 'bell' }
        // { path: '/admin/ui/loadings', component: 'Loadings', title: 'loading' }
      ]
    }
  ],
  others: []
};
