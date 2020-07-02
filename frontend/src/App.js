import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";
import MovieDetail from "./components/movieDetailComponent";
import protectRoute from "./utils/protectRoutes";
import Search from "./components/searchComponent";

//protectRoute lleva 3 parametros, el componente a proteger,
// el primer boolean si hay que proteger si está logueado,
//el segundo booloean si hay que proteger si está deslogeuado

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/search/:searchWord" exact component={Search} />
      <Route path="/login" exact component={protectRoute(Login, true, false)} />
      <Route
        path="/register"
        exact
        component={protectRoute(Register, true, false)}
      />
      <Route path="/movie/:imdbID" exact component={MovieDetail} />
    </Router>
  );
}

export default App;
