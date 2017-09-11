import React, { Component } from "react";
import GoogleAnalytics from "react-ga";
import { BrowserRouter, Route } from "react-router-dom";
import ListPage from "./ListPage";
import RunPage from "./RunPage";
import config from "./config";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    if (config.GOOGLE_ANALYTICS_CODE) {
      GoogleAnalytics.initialize(config.GOOGLE_ANALYTICS_CODE);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ListPage} />
          <Route exact path="/run/:rom" component={RunPage} />
          <Route path="/" render={this.recordPageview} />
        </div>
      </BrowserRouter>
    );
  }

  recordPageview = ({location}) => {
    GoogleAnalytics.pageview(location.pathname);
    return null;
  };
}

export default App;
