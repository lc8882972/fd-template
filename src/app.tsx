import * as React from 'react';

import { HashRouter as Router } from 'react-router-dom';
import RouteList from 'components/route-list';
import routes from './routerConfig';

import './index.scss';


class App extends React.Component {


  public render() {
    return (<Router>
      <RouteList routes={routes} />
    </Router>);
  }
}

export default App;
