import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";
import MovieDetail from "./components/movieDetailComponent";
import protectRoute from "./utils/protectRoutes";
import Search from "./components/searchComponent";
import Profile from "./components/profileComponent";
import EditProfile from "./components/editProfileComponent";
import About from "./components/aboutComponent";

//protectRoute lleva 3 parametros, el componente a proteger,
// el primer boolean si hay que proteger si está logueado,
//el segundo booloean si hay que proteger si está deslogeuado

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:searchWord/:page" exact component={Search} />
        <Route
          path="/login"
          exact
          component={protectRoute(Login, true, false)}
        />
        <Route
          path="/profile"
          exact
          component={protectRoute(Profile, false, true)}
        />
        <Route
          path="/profile/edit"
          exact
          component={protectRoute(EditProfile, false, true)}
        />
        <Route
          path="/register"
          exact
          component={protectRoute(Register, true, false)}
        />
        <Route path="/movie/:imdbID" exact component={MovieDetail} />
        <Route path="/about" exact component={About} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
