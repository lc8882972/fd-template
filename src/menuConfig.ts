// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import { action, autorun, observable } from "mobx";

const headerMenuConfig: any[] = [];

const asideMenuConfig = observable([
  {
    name: "Home",
    path: "/",
    icon: "home"
  },
  {
    name: "子页面",
    path: "/subpage",
    icon: "home",
    children: [
      {
        name: "page1",
        path: "/subpage/page1"
      },
      {
        name: "page2",
        path: "/subpage/page2"
      }
    ]
  },
  {
    name: "帮助",
    path: "/help",
    icon: "help"
  },
  {
    name: "页面配置",
    path: "/setting"
  }
]);

const menus = [
  {
    id: 1,
    name: "sys_menu",
    url: "/menu",
    description: "菜单管理",
    parentNode: null,
    createTime: "2019-04-19T02:54:41.000+0000",
    enabled: true
  },
  {
    id: 2,
    name: "sys_menu_create",
    url: "/menu/post",
    description: "添加菜单",
    parentNode: 1,
    createTime: "2019-04-19T02:56:24.000+0000",
    enabled: true
  },
  {
    id: 3,
    name: "sys_menu_list",
    url: "/menu/list",
    description: "菜单列表",
    parentNode: 1,
    createTime: "2019-04-19T03:00:14.000+0000",
    enabled: true
  },
  {
    id: 4,
    name: "sys_permission",
    url: "/permission",
    description: "权限管理",
    parentNode: null,
    createTime: "2019-04-19T03:01:20.000+0000",
    enabled: true
  },
  {
    id: 5,
    name: "sys_permission_set",
    url: "/permission/set",
    description: "设置权限",
    parentNode: 4,
    createTime: "2019-04-19T03:02:12.000+0000",
    enabled: true
  }
];

const menuList = menus.filter(m => m.parentNode === null);

function findChild(curr: any, all: any[]) {
  curr.children = all.filter(f => f.parentNode === curr.id);
  curr.path = curr.url;
  curr.name = curr.description;
  curr.children.forEach((e: any) => {
    findChild(e, all);
  });
}

menuList.forEach(l => {
  findChild(l, menus);
});

const a =action(() => {
  asideMenuConfig.push(...menuList);
  console.log(asideMenuConfig);
})
a();
export { headerMenuConfig, asideMenuConfig };
