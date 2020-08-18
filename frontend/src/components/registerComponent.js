import React, { Component } from "react";
import "../assets/styles/login-register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import star from "../assets/img/star.svg";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      showError: false,
      errorIndex: undefined,
      errors: [
        "Something went wrong, try again.",
        "Username too short, at least 4 characters.",
        "Username already taken.",
        "Invalidad email.",
        "Email already taken.",
        "Password too short, at least 8 characters.",
      ],
    };
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showError: false, errorIndex: undefined });
    axios
      .post("http://localhost:5000/api/v1/users/register", this.state)
      .then((response) => {
        this.props.history.push("/login");
      })
      .catch((error) => {
        let errorIndex = 0;
        switch (error.response.data.message) {
          case "Username short":
            errorIndex = 1;
            break;
          case "Username taken":
            errorIndex = 2;
            break;
          case "Invalid email":
            errorIndex = 3;
            break;
          case "Email taken":
            errorIndex = 4;
            break;
          case "Password too short":
            errorIndex = 5;
            break;
          default:
            errorIndex = 0;
            break;
        }
        this.setState({ errorIndex, showError: true, password: "" });
      });
  };

  render() {
    return (
      <div className="container-forms">
        <div className="wrap-forms-box">
          <a href="/">
            <img src={star} alt="Star" />
          </a>
          <h2 className="font-weight-bold mt-3 mb-3">Register</h2>
          {this.state.showError ? (
            <Alert
              variant="danger"
              onClose={() => this.setState({ showError: false })}
              dismissible
            >
              <Alert.Heading as="label">
                {" "}
                {this.state.errors[this.state.errorIndex]}{" "}
              </Alert.Heading>
            </Alert>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="font-weight-bold">Username</label>
              <div className="input-border-valid">
                <input
                  className="form-control"
                  type="text"
                  required
                  onChange={this.handleChangeUsername}
                  value={this.state.username}
                />
              </div>
            </div>
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
                  value="Register"
                />
              </div>
            </div>
          </form>
          <div className="link-to-login-register">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
