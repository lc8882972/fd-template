import * as React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import routerConfig from "./routerConfig";
const { Suspense } = React;

interface IRoute {
  path: string;
  layout: any;
  component: any;
  childRoutes?: any[]
}

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouterConfigV4(config: any[] = []): any[] {
  const routeMap: any[] = [];
  config.forEach((item: any) => {
    const route: IRoute = {
      path: item.path,
      layout: item.layout,
      component: item.component
    };
    if (Array.isArray(item.children)) {
      route.childRoutes = recursiveRouterConfigV4(item.children);
    }
    routeMap.push(route);
  });
  return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 *
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   <Route exact path="/page4" component={Page4} />
 *   <Route exact path="/page3/:id" component={Page3} />
 *   <Route exact component={NotFound} />
 * </Switch>
 */
function renderRouterConfigV4(container: any, router: any, contextPath: string) {
  const routeChildren: any[] = [];
  const renderRoute = (routeContainer: any, routeItem: any, routeContextPath: any, index: number) => {
    let routePath: string = '';
    if (!routeItem.path) {
      // eslint-disable-next-line
      console.error("route must has `path`");
    } else if (routeItem.path === "/" || routeItem.path === "*") {
      routePath = routeItem.path;
    } else {
      routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, "/");
    }
    // 优先使用当前定义的 layout
    if (routeItem.layout && routeItem.component) {
      routeChildren.push(
        <Route
          key={routePath + index}
          exact={true}
          path={routePath}
          render={props => {
            return React.createElement(
              routeItem.layout,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else if (routeContainer && routeItem.component) {
      // 使用上层节点作为 container
      routeChildren.push(
        <Route
          key={routePath + index}
          exact={true}
          path={routePath}
          render={props => {
            return React.createElement(
              routeContainer,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else {
      routeChildren.push(
        <Route
          key={routePath + index}
          exact={true}
          path={routePath}
          render={props => {
            return React.createElement(
              routeItem.component,
              props,
            );
          }}
        />
      );
    }

    // 存在子路由，递归当前路径，并添加到路由中
    if (Array.isArray(routeItem.childRoutes)) {
      routeItem.childRoutes.forEach((r: any, i: number) => {
        // 递归传递当前 route.component 作为子节点的 container
        renderRoute(routeItem.component, r, routePath, i);
      });
    }
  };

  router.forEach((r: any, index: number) => {
    renderRoute(container, r, contextPath, index);
  });
  return <Suspense fallback={<div>Loading...</div>}> <Switch>{routeChildren}</Switch></Suspense>;
}

const routerWithReactRouter4 = recursiveRouterConfigV4(routerConfig);
const routeChildrenV4 = renderRouterConfigV4(null, routerWithReactRouter4, "/");
export default () => (<Router>{routeChildrenV4}</Router>);
