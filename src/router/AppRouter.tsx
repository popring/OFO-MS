import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { menus as RoutesConfig, IMenu, IMenuBase } from './AppConfig';
import AllComponents from 'components/index';

export class AppRouter extends Component {
  createRoute = (key: string) => {
    return RoutesConfig[key].map((r: IMenu) => {
      const route = (r: IMenuBase) => <Route path={r.path} component={AllComponents[r.component]} title={r.title} />;

      const subRoute = (r: IMenu) =>
        r.subs && r.subs.map((subR: IMenu) => <Route path={subR.path} component={AllComponents[subR.component]} title={subR.title} />);

      return r.component ? route(r) : subRoute(r);
    });
  };

  render() {
    return <Switch>{Object.keys(RoutesConfig).map(k => this.createRoute(k))}</Switch>;
  }
}

export default AppRouter;
