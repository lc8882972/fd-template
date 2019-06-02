import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Router from './router';
import { ThemeContext, themes } from './store/context';

import './index.scss';

interface IState {
  theme: React.ProviderProps<any>
}

class App extends React.Component<IState> {
  public state = {
    theme: themes.dark
  }

  public render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Router />
      </ThemeContext.Provider>)
  }
}

export default hot(App);
