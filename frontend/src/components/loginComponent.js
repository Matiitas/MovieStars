import React, { Component } from "react";
import "../assets/styles/login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .login(this.state)
      .then((response) => {
        console.log("Response despues del dispatch: ", response);
        if (response === "Login correct") {
          this.props.history.push("/");
        } else {
          this.setState({ error: response, password: "" });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="outter-box">
        <div>
          Login
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <input
                type="email"
                required
                onChange={this.handleChangeEmail}
                placeholder="Email"
                value={this.state.email}
              />
            </div>
            <div className="form-group row">
              <input
                type="password"
                required
                onChange={this.handleChangePassword}
                placeholder="Password"
                autoComplete="on"
                value={this.state.password}
              />
            </div>
            <input type="submit" value="Login" />
          </form>
          <div>
            <Link to="/register">Register?</Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { login })(Login);

// En este caso mapStateToProps es null y login seria mapDispatchToProps

/* The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it
 needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new,
 connected component class that wraps the component you passed in.

function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)

The mapStateToProps and mapDispatchToProps deals with your Redux store’s
 state and dispatch, respectively. state and dispatch will be supplied to your
  mapStateToProps or mapDispatchToProps functions as the first argument. */
