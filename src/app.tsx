import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import RouteList from 'components/route-list';
import { HashRouter as Router } from 'react-router-dom';
import routes from './routerConfig';
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
        <Router>
          <RouteList routes={routes} />
        </Router>
      </ThemeContext.Provider>)
  }
}

export default hot(App);
