import * as React from 'react';
import { hot } from 'react-hot-loader'

class App extends React.Component {

  x: string = 'null';
  public render() {
    return (
      <div>Hello World! Mr.Zh</div>
    )
  }
}

export default hot(module)(App)
