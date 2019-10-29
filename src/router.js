import React from 'react';
import App from './App';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Admin from './admin';
import Home from './pages/Home'
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallerys from './pages/ui/gallerys';

import NoMatch from './pages/nomatch';


export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          {/* <Redirect exact from="/" to="/admin/home"></Redirect> */}
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
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path="/order/detail"></Route>
          </Switch>
        </App>
      </HashRouter>
    );
  }
}