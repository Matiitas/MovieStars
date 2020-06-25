import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  authenticatedLinks() {
    return (
      <ul
        style={{ listStyle: "none" }}
        className="d-flex justify-content-between"
      >
        <li>
          <a href="/" onClick={this.handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    );
  }

  guestLinks() {
    return (
      <ul
        style={{ listStyle: "none" }}
        className="d-flex justify-content-between"
      >
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar navbar-default">
        <div className="row col-12">
          <div className="col-10">
            <Link to="/">MovieStars</Link>
          </div>
          <div className="col-2">
            {isAuthenticated ? this.authenticatedLinks() : this.guestLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

//aca le indicamos que este componente necesita
NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavBar);

/*  Documentacion de mapStateToProps Function

 As the first argument passed in to connect, mapStateToProps is used
 for selecting the part of the data from the store that the connected
  component needs. It’s frequently referred to as just mapState for short.
It is called every time the store state changes.
It receives the entire store state, and should return an object of data this component needs.

mapStateToProps should be defined as a function:
function mapStateToProps(state, ownProps?)

It should take a first argument called state, optionally a second 
argument called ownProps, and return a plain object containing 
the data that the connected component needs.

This function should be passed as the first argument to connect,
 and will be called every time when the Redux store state changes.
  If you do not wish to subscribe to the store, pass null or
   undefined to connect in place of mapStateToProps.

It does not matter if a mapStateToProps function is written using
 the function keyword (function mapState(state) { } ) or
as an arrow function (const mapState = (state) => { } ) - it will work the same either way. 

Your mapStateToProps function should return a plain object that contains
the data the component needs:

    Each field in the object will become a prop for your actual component
    The values in the fields will be used to determine if your component needs to re-render
For example:

function mapStateToProps(state) {
  return {
    a: 42,
    todos: state.todos,
    filter: state.visibilityFilter
  }
}
component will receive: props.a, props.todos, and props.filter*/
