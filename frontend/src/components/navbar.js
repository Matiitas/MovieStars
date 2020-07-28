import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";
import star from "../assets/img/star.svg";
import "../assets/styles/navbar.css";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleReload = (event) => {
    event.preventDefault();
    if (this.props.history.location.pathname === "/") {
      window.location.reload();
    } else {
      this.props.history.push("/");
    }
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  handleSearch = (inputSearch) => {
    if (inputSearch === "" || inputSearch === undefined) {
      console.log("Search input void");
    } else {
      this.props.history.push("/search/" + inputSearch + "/1");
    }
  };

  authenticatedLinks() {
    return (
      <React.Fragment>
        <NavItem name="link-right" text="Profile" to="/profile"></NavItem>
        <NavItem
          name="link-right"
          text="Logout"
          to="/"
          onClick={this.handleLogout}
        ></NavItem>
      </React.Fragment>
    );
  }

  guestLinks() {
    return (
      <React.Fragment>
        {" "}
        <NavItem name="link-right" text="Login" to="/login"></NavItem>
        <NavItem name="link-right" text="Register" to="/register"></NavItem>
      </React.Fragment>
    );
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <nav className="navbar-wrapper">
        <ul className="navbar-nav-box">
          <NavItem
            name="link-left"
            img={star}
            to="/"
            onClick={this.handleReload}
          ></NavItem>
          <NavItem
            name="title"
            text="MovieStars"
            to="/"
            onClick={this.handleReload}
          ></NavItem>
          <SearchBar onSearch={this.handleSearch} />
          <NavItem name="link-right" text="About" to="/about"></NavItem>
          <NavItem name="link-right" text="Contact" to="/contact"></NavItem>
          {isAuthenticated ? this.authenticatedLinks() : this.guestLinks()}
          <NavItem name="link-right-dropdown" img={star}>
            <DropdownMenu
              isAuthenticated={isAuthenticated}
              onClick={this.handleLogout}
            />
          </NavItem>
        </ul>
      </nav>
    );
  }
}

function SearchBar(props) {
  const [inputSearch, setInputSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Este es lo que buscas: ", inputSearch);
    props.onSearch(inputSearch);
  };

  return (
    <li className="nav-searchbox">
      <form onSubmit={handleSubmit}>
        <input
          required
          type="search"
          placeholder="Search"
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </li>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className={props.name ? "nav-" + props.name : "nav-item"}>
      <Link
        to={props.to ? props.to : "#"}
        onClick={props.onClick ? props.onClick : () => setOpen(!open)}
      >
        {props.text ? (
          <span>{props.text}</span>
        ) : (
          <span>
            <img src={props.img} alt="Star" />
          </span>
        )}
      </Link>
      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  function DropdownItem(props) {
    return (
      <Link
        to={props.to ? props.to : "#"}
        onClick={props.onClick ? props.onClick : null}
        className="menu-item"
      >
        {props.children}
      </Link>
    );
  }

  const isAuthenticated = (handleClick) => {
    return (
      <React.Fragment>
        <DropdownItem to="/profile">Profile</DropdownItem>
        <DropdownItem onClick={handleClick} to="#">
          Logout
        </DropdownItem>
      </React.Fragment>
    );
  };

  const isGuest = () => {
    return (
      <React.Fragment>
        <DropdownItem to="/login">Login</DropdownItem>
        <DropdownItem to="/register">Register</DropdownItem>
      </React.Fragment>
    );
  };

  return (
    <SlideDown className="drop-hamburger">
      <DropdownItem to="/about">About</DropdownItem>
      <DropdownItem to="/contact">Contact</DropdownItem>
      {props.isAuthenticated ? isAuthenticated(props.onClick) : isGuest()}
    </SlideDown>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(withRouter(Navbar));

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
