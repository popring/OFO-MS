/*
 * @Author: Harry.Hao
 * @Date: 2020-01-14 19:48:39
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-16 13:15:27
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from 'components/pages/Login';
import Test from 'components/demo';
import App from 'src/App';

import 'antd/dist/antd.less';
import 'src/style/index.less';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/demo" component={Test} />
        <Route path="/app" component={App} />
      </Switch>
    </Router>
  );
};
