import { Tree } from "@alifd/next";
import { observer } from "mobx-react";
import * as React from "react";

const data = [
  {
    label: "Component",
    key: "0",
    children: [
      {
        label: "Form",
        key: "2",
        selectable: false,
        children: [
          {
            label: "Input",
            key: "4"
          },
          {
            label: "Select",
            key: "5",
            // disabled: true,
            selectable: true
          }
        ]
      },
      {
        label: "Display",
        key: "3",
        children: [
          {
            label: "Table",
            key: "6"
          }
        ]
      }
    ]
  }
];

const menus = [
  {
    id: 1,
    name: "sys_menu",
    url: "/menu",
    description: "菜单管理",
    parent: null
  },
  {
    id: 2,
    name: "sys_menu_create",
    url: "/menu/post",
    description: "添加菜单",
    parent: 1
  },
  {
    id: 3,
    name: "sys_menu_list",
    url: "/menu/list",
    description: "菜单列表",
    parent: 1
  },
  {
    id: 4,
    name: "sys_permission",
    url: "/permission",
    description: "权限管理",
    parent: null
  },
  {
    id: 5,
    name: "sys_permission_set",
    url: "/permission/set",
    description: "设置权限",
    parent: 4
  }
];

const menuList = menus.filter(m => m.parent === null);

function findChild(curr: any, all: any[]) {
  curr.children = all.filter(f => f.parent === curr.id);
  curr.key = curr.id.toString();
  curr.label = curr.description;
  curr.children.forEach((e: any) => {
    findChild(e, all);
  });
}

menuList.forEach(l => {
  findChild(l, menus);
});

interface IState {
  checkedKeys: any[];
  checkStrictly: boolean;
}

@observer
export default class Set extends React.Component<any, IState> {
  public onCheck(keys: string[], info: any) {
    console.log("onCheck->keys:", keys);
    console.log("onCheck->data:", info);
  }

  public render() {
    return (
      <Tree
        defaultExpandAll={true}
        showLine={true}
        checkable={true}
        editable={true}
        defaultCheckedKeys={["4", "5"]}
        onCheck={this.onCheck}
        dataSource={menuList}
      />
    );
  }
}
