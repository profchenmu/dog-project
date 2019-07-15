import * as React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home';

class App extends React.Component {
  constructor(props: object) {
    super(props)
  }

  public render() {
    return (
      <BrowserRouter>
        <Route path="/" exact={true} component={Home} />
      </BrowserRouter>
    )
  }
}
export default App;