// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from 'layouts/HeaderAsideFooterLayout';
import Home from 'pages/home/index';
import Page1 from 'pages/page1/index';
import Page2 from 'pages/page2/index';
import Help from 'pages/help/index';
import Setting from 'pages/setting/index';
import Permission from 'pages/permission/set';
import MenuList from 'pages/menu';

const routerConfig = [
  {
    path: '/',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: Home,
  },
  {
    path: '/setting',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: Setting,
  },
  {
    path: '/subpage/page1',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: Page1,
  },
  {
    path: '/subpage/page2',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: Page2,
  },
  {
    path: '/help',
    exact: true,
    component: Help,
  },
  {
    path: '/permission/set',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: Permission,
  },
  {
    path: '/menu/list',
    exact: true,
    layout: HeaderAsideFooterLayout,
    component: MenuList,
  },
];

export default routerConfig;
