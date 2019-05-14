import { Nav } from "@alifd/next";
import classNames from "classnames";
import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

const { Item, Group, SubNav } = Nav;

interface ISideMenuProps extends RouteComponentProps<any> {
  dataSource: any[];
  className: string;
}

class SideMenu extends React.Component<ISideMenuProps> {
  public static defaultProps = {
    dataSource: []
  };

  /**
   *
   * 获取组件文档
   * @param {*} dataSource
   * @returns
   */
  public getComponentItems(dataSource: any[]) {
    return dataSource.map(item => {
      if (item.children && item.children.length) {
        if (item.itemType !== "group") {
          return (
            <SubNav key={item.path} label={item.name}>
              {this.getComponentItems(item.children)}
            </SubNav>
          );
        }
        return (
          <Group key={item.path} label={item.name}>
            {this.getComponentItems(item.children)}
          </Group>
        );
      }
      return (
        <Item key={item.path}>
          <Link to={`${item.path}${location.search}`}>{item.name}</Link>
        </Item>
      );
    });
  }

  public render() {
    const { match, dataSource, className } = this.props;

    if (!dataSource.length) {
      return null;
    }

    const cls = classNames({
      "side-menu": true,
      [className]: !!className
    });

    return (
      <Nav
        className={cls}
        selectedKeys={[match.path]}
        type="primary"
        activeDirection={null}
        defaultOpenAll={true}
      >
        {this.getComponentItems(dataSource)}
      </Nav>
    );
  }
}
export default withRouter(SideMenu);
