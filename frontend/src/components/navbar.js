import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";
import star from "../assets/img/star.svg";
import hamburger from "../assets/img/hamburger.svg";
import "../assets/styles/navbar.css";
import "react-slidedown/lib/slidedown.css";
import SearchBar from "./searchBar";
import NavItem from "./navItem";
import DropdownMenu from "./dropDownMenu";

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
    if (inputSearch || inputSearch !== "") {
      this.props.history.push("/search/" + inputSearch + "/1");
      window.location.reload();
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
          {isAuthenticated ? this.authenticatedLinks() : this.guestLinks()}
          <NavItem name="link-right-dropdown" img={hamburger}>
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
