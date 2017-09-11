import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import ListPage from "./ListPage";
import RunPage from "./RunPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={ListPage} />
          <Route exact path="/run/:rom" component={RunPage} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
