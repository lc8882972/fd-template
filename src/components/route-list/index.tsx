import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

interface IRouteListProps{
  routes:any[]
}

class RouteList extends React.Component<IRouteListProps> {
  static propTypes = {
    /**
     * route 列表
     */
    routes: PropTypes.array,
  };

  render() {
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
