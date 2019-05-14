// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import App from './app';
import './index.scss';

ReactDom.render(
  <App />,
  document.getElementById('container')
);
