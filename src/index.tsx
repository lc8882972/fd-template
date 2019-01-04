import * as React from 'react';
import * as ReactDom from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';

import './index.scss';
import App from './app';

ReactDom.render(
  <App />,
  document.getElementById('container')
);
