import React from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";

import Index from "./pages/index"
// BrowserRouter
import { Route, HashRouter as Router } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Index>
          <Route path="/home" component={Home} />
          <Route path="/Profile" component={Profile} />
          <Route path="/User" component={User} />
        </Index>
      </Router>
    );
  }
}
