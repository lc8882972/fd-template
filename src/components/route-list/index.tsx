import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

interface IRouteListProps{
  routes:any[]
}

class RouteList extends React.Component<IRouteListProps> {
  public static propTypes = {
    /**
     * route 列表
     */
    routes: PropTypes.array,
  };

  public render() {
    const { routes } = this.props;
    return (
      <Switch>
        {routes.map(route => (
          <Route
            exact={route.exact}
            key={route.path}
            path={route.path}
            render={(props) => {
              const component = React.createElement(route.component, props);

              if (route.layout) {
                return React.createElement(route.layout, props, component);
              }
              return component;
            }}
          />
        ))}
      </Switch>
    );
  }
}

export default RouteList;
