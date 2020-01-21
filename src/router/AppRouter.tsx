import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { menus as RoutesConfig, IMenu, IMenuBase } from './AppConfig';
import AllComponents from 'components/index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.less';

export class AppRouter extends Component<RouteComponentProps> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  createRoute = (key: string) => {
    return RoutesConfig[key].map((r: IMenu) => {
      const route = (r: IMenuBase) => <Route key={r.path} path={r.path} component={AllComponents[r.component]} exact />;

      const subRoute = (r: IMenu) =>
        r.subs &&
        r.subs.map((subR: IMenu) => (
          <Route path={subR.path} component={AllComponents[subR.component]} title={subR.title} />
        ));

      return r.component ? route(r) : subRoute(r);
    });
  };

  render() {
    const { location } = this.props;
    return (
      <TransitionGroup className={'router-wrapper'}>
        <CSSTransition timeout={300} key={location.pathname} classNames="page" appear unmountOnExit>
          <Switch location={location}>
            {Object.keys(RoutesConfig).map(k => this.createRoute(k))}
            <Redirect exact from="/app" to="/app/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(AppRouter);
