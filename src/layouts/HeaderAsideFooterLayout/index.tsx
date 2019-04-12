import * as React from "react";
import Header from "components/header/index";
import SideMenu from "components/side-menu/index";
import { asideMenuConfig } from "../../menuConfig";
import Breadcrumb from "components/base/breadcrumb";

import "./index.scss";

class Layout extends React.Component {
  render() {
    return (
      <div className="header-aside-footer-layout">
        <Header defaultSelectedKeys="" />
        <div className="body">
          <SideMenu dataSource={asideMenuConfig} className="aside" />
          <div className="main">
            <Breadcrumb />
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
