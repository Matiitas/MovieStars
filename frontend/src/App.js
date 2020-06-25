import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";
import protectRoute from "./utils/protectRoutes";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={protectRoute(Login, true, false)} />
      <Route
        path="/register"
        exact
        component={protectRoute(Register, true, false)}
      />
    </Router>
  );
}

export default App;
