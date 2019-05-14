// import * as PropTypes from 'prop-types';
// import * as classNames from 'classnames';
import { Balloon, Menu, Nav } from '@alifd/next';
import * as React from 'react';
// import { path, getUrlParam, appData, role, style, showTour, removeTour } from 'utils/index';

import './index.scss';

// const { Item } = Nav;

interface IHeaderProps{
  fullHeader: boolean | null,
  defaultSelectedKeys: string | any[];
}

class Header extends React.Component<IHeaderProps> {
  // static propTypes = {
  //   fullHeader: PropTypes.bool,
  //   defaultSelectedKeys: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.array,
  //   ]),
  // };

  public static defaultProps = {
    fullHeader: true,
  };


  public header() {
    return (<div className="header-logo">
      <a href="/">
        <img src="//img.alicdn.com/tfs/TB1pKookmzqK1RjSZFHXXb3CpXa-240-70.png" />
      </a>
    </div>);
  }
  public footer() {
    const userinfo = {
      avatarUrl: '//img.alicdn.com/tps/TB1kssgNXXXXXc_aXXXXXXXXXXX-56-56.png',
      displayName: '未登录',
    };

    const trigger = (<a href="/my" style={{ textDecoration: 'none' }}>
      <img src={userinfo.avatarUrl} className="avatar" />
      <span className="name">{userinfo.displayName}</span>
    </a>);

    return (<div>
      <Balloon trigger={trigger} closable={false} offset={[0, 10]} style={{ padding: 4 }}>
        <Menu style={{ border: 'none' }}>
          <Menu.Item><a href="/personal/register" >个人设置</a></Menu.Item>
          <Menu.Item><a href="/logout" >退出登录</a></Menu.Item>
        </Menu>
      </Balloon>
    </div>
    );
  }
  public render() {
    const { fullHeader, defaultSelectedKeys } = this.props;

    const content = (
      <Nav
        direction="hoz"
        type="primary"
        activeDirection={null}
        hozAlign="right"
        defaultSelectedKeys={defaultSelectedKeys}
        header={this.header()}
        footer={this.footer()}
        className="header-nav"
      >
      </Nav>);

    return (
      <div className="header" id="header">
        {fullHeader ? content : <div className="header-limit">{content}</div>}
      </div>
    );
  }
}

export default Header;
