import React from 'react';
import App from './App';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

// ui 页面
import Login from './pages/Login';
import Admin from './admin';
import Common from './common';
import Home from './pages/Home'
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallerys from './pages/ui/gallerys';
import Carousels from './pages/ui/carousels';

// form 页面
import FormLogin from './pages/form/FormLogin';
import FormRegister from './pages/form/FormRegister';

// table
import BasicTable from './pages/table/basicTable';
import HeightTable from './pages/table/heightTable';

// city
import City from './pages/city';

// order
import Order from './pages/order';
import OrderDetail from './pages/order/detail';

// User
import User from './pages/user';

// 匹配路由错误
import NoMatch from './pages/nomatch';


export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" render={() =>
              <Admin>
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
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            }
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}