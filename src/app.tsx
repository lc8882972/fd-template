import * as React from 'react';

import { HashRouter as Router } from 'react-router-dom';
import RouteList from 'components/route-list';
import routes from './routerConfig';
import { ThemeContext, themes } from './store/context';

import './index.scss';

interface IState {
  theme: React.ProviderProps<any>
}

class App extends React.Component<IState> {
  state = {
    theme: themes.dark
  }

  public render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Router>
          <RouteList routes={routes} />
        </Router>)
    </ThemeContext.Provider>)
  }
}

export default App;
