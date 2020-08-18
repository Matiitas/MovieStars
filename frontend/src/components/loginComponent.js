import React, { Component } from "react";
import "../assets/styles/login-register.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import star from "../assets/img/star.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", showError: false };
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
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ showError: true, password: "" });
      });
  };

  render() {
    return (
      <div className="container-forms">
        <div className="wrap-forms-box">
          <a href="/">
            <img src={star} alt="Star" />
          </a>
          <h2 className="font-weight-bold mt-3 mb-3">Sign In</h2>
          {this.state.showError ? (
            <Alert
              variant="danger"
              onClose={() => this.setState({ showError: false })}
              dismissible
            >
              <Alert.Heading as="label">
                {" "}
                Email or password incorrect!
              </Alert.Heading>
            </Alert>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="font-weight-bold">Email</label>
              <div className="input-border-valid">
                <input
                  className="form-control"
                  type="email"
                  required
                  onChange={this.handleChangeEmail}
                  value={this.state.email}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="font-weight-bold">Password</label>
              <div className="input-border-valid">
                <input
                  className="form-control"
                  type="password"
                  required
                  onChange={this.handleChangePassword}
                  autoComplete="on"
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="wrap-forms-button">
              <div className="border-forms-button">
                <input
                  className="btn btn-light"
                  type="submit"
                  value="Sign in"
                />
              </div>
            </div>
          </form>
          <div className="link-to-login-register">
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
