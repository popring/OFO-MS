import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { userLogin } from '@/redux/action';
// import { isLogin } from '@/utils/checkLogin';

// ui 页面
import Login from '@/pages/Login';
import Admin from '@/admin';
import Common from '@/common';
import Home from '@/pages/Home'
import Buttons from '@/pages/ui/buttons';
import Modals from '@/pages/ui/modals';
import Loadings from '@/pages/ui/loadings';
import Notifications from '@/pages/ui/notifications';
import Messages from '@/pages/ui/messages';
import Tabs from '@/pages/ui/tabs';
import Gallerys from '@/pages/ui/gallerys';
import Carousels from '@/pages/ui/carousels';

// form 页面
import FormLogin from '@/pages/form/FormLogin';
import FormRegister from '@/pages/form/FormRegister';

// table
import BasicTable from '@/pages/table/basicTable';
import HeightTable from '@/pages/table/heightTable';

// city
import City from '@/pages/city';

// order
import Order from '@/pages/order';
import OrderDetail from '@/pages/order/detail';

// User
import User from '@/pages/user';

// Echarts
import Bar from '@/pages/echarts/bar';
import Pie from '@/pages/echarts/pie';
import Line from '@/pages/echarts/line';

// 文本编辑器
import Rich from '@/pages/rich';

// 匹配路由错误
import NoMatch from '@/pages/nomatch';

class IRouter extends React.Component {

  // 已登录
  isLoginFlag = false

  constructor(props) {
    super(props);
    this.isLoginFlag = this.isLogin()
  }

  isLogin = () => {
    // 读取本地临时存储
    let userInfo = window.sessionStorage.getItem('userInfo');
    if (!userInfo) {
      return false
    }
    const { dispatch } = this.props;
    dispatch(userLogin(JSON.parse(userInfo)));
    return true;
  }

  render() {
    // const routes = [
    //   { path: '/login', component: Login },
    //   {
    //     path: '/admin', component: Admin, routes: [
    //       // { redirect: true, from: '/admin', to: "/admin/home", exact: true },
    //       { path: '/admin/home', component: Home, requiresAuth: true },
    //       { path: '/admin/ui/buttons', component: Buttons },
    //       { path: '/admin/ui/modals', component: Modals },
    //       { path: '/admin/ui/loadings', component: Loadings },
    //       { path: '/admin/ui/notification', component: Notifications },
    //       { path: '/admin/ui/messages', component: Messages },
    //       { path: '/admin/ui/tabs', component: Tabs },
    //       { path: '/admin/ui/gallery', component: Gallerys },
    //       { path: '/admin/ui/carousel', component: Carousels },
    //       { path: '/admin/form/login', component: FormLogin },
    //       { path: '/admin/form/reg', component: FormRegister },
    //       { path: '/admin/table/basic', component: BasicTable },
    //       { path: '/admin/table/high', component: HeightTable },
    //       { path: '/admin/city', component: City },
    //       { path: '/admin/order', component: Order },
    //       { path: '/admin/user', component: User },
    //       { path: '/admin/charts/bar', component: Bar },
    //       { path: '/admin/charts/pie', component: Pie },
    //       { path: '/admin/charts/line', component: Line },
    //       { path: '/admin/rich', component: Rich },
    //       { path: '/admin/NoMatch', component: NoMatch },
    //       { path: '*', component: NoMatch },
    //     ]
    //   },
    //   {
    //     path: '/common', component: Common, routes: [
    //       { path: '/common/order/detail/:orderId', component: OrderDetail }
    //     ]
    //   }
    // ];

    // return (
    //   <HashRouter>
    //     <App>
    //       {
    //         renderRoutes(routes, authed, authPath)
    //       }
    //     </App>
    //   </HashRouter>
    // )

    
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/admin"
            render={(props) => {
              const { token } = this.props.userInfo;
              if (!this.isLoginFlag && !token ) {
                return <Redirect to="/login" ></Redirect>
              }
              return (
                <Admin history={props.history}>
                  <Switch>
                    <Redirect exact from="/admin" to="/admin/home"></Redirect>
                    <Route path="/admin/home" component={Home}></Route>
                    <Route path="/admin/ui/buttons" component={Buttons}></Route>
                    <Route path="/admin/ui/modals" component={Modals}></Route>
                    <Route path="/admin/ui/loadings" component={Loadings}></Route>
                    <Route path="/admin/ui/notification" component={Notifications}></Route>
                    <Route path="/admin/ui/messages" component={Messages}></Route>
                    <Route path="/admin/ui/tabs" component={Tabs}></Route>
                    <Route path="/admin/ui/gallery" component={Gallerys}></Route>
                    <Route path="/admin/ui/carousel" component={Carousels}></Route>
                    <Route path="/admin/form/login" component={FormLogin}></Route>
                    <Route path="/admin/form/reg" component={FormRegister}></Route>
                    <Route path="/admin/table/basic" component={BasicTable}></Route>
                    <Route path="/admin/table/high" component={HeightTable}></Route>
                    <Route path="/admin/city" component={City}></Route>
                    <Route path="/admin/order" component={Order}></Route>
                    <Route path="/admin/user" component={User}></Route>
                    <Route path="/admin/charts/bar" component={Bar}></Route>
                    <Route path="/admin/charts/pie" component={Pie}></Route>
                    <Route path="/admin/charts/line" component={Line}></Route>
                    <Route path="/admin/rich" component={Rich}></Route>
                    <Route component={NoMatch}></Route>
                  </Switch>
                </Admin>
              )
            }}
          ></Route>
          <Route path="/common" render={() =>
            <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail} />
            </Common>
          }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(IRouter);