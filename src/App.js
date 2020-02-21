import React, { Component } from "react";
import Main from "./components/Main";
import {Switch, Route, BrowserRouter} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path='/cvss' component={Main}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
