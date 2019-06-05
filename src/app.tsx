import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Router from './router';
import { ThemeContext, themes, ITheme } from './store/context';

import './index.scss';
const { useState } = React;

function App() {
  const [theme] = useState<ITheme>(themes.dark);

  return (
    <ThemeContext.Provider value={theme}>
      <Router />
    </ThemeContext.Provider>)
}

export default hot(App);
