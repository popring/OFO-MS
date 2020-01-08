import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
const renderRoutes = (routes, authed, authPath = '/login', extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          console.log(route.requiresAuth, authed, route.path, authPath);
          console.log(props.location.pathname, 'props');
          if (!route.requiresAuth || authed || route.path === authPath) {
            if (!route.routes)
              return <route.component {...props} {...extraProps} route={route} />
            else {
              const route2 =
                route.routes.find(val => val.path === props.location.pathname) ||
                route.routes.find(val => val.path === '*') ||
                null
                ;
              return (
                <route.component {...props} {...extraProps} route={route}>
                  <route2.component key={route2.path} />
                </route.component>
              )

            }
          }
          return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
        }
        }
      />
    ))}
  </Switch>
) : null
export default renderRoutes;