import Header from "../../components/header/index";
import SideMenu from "../../components/side-menu/index";
import { observer } from 'mobx-react';
import * as React from "react";
import { asideMenuConfig } from "../../menuConfig";

import "./index.scss";

@observer
class Layout extends React.Component {
  public render() {
    return (
      <div className="ice-layout">
        <div className="header-aside-footer-layout">
          <Header defaultSelectedKeys="" />
          <div className="body">
            <SideMenu dataSource={asideMenuConfig} className="aside" />
            <div className="main">
              <div className="layout">
                {/* <Breadcrumb /> */}
                <div className="content">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
