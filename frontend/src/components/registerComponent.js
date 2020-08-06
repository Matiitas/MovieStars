import React, { Component } from "react";
import "../assets/styles/register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

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
      <div className="outter-box">
        {this.state.showError ? (
          <Alert
            variant="danger"
            onClose={() => this.setState({ showError: false })}
            dismissible
          >
            <Alert.Heading>
              {" "}
              {this.state.errors[this.state.errorIndex]}{" "}
            </Alert.Heading>
          </Alert>
        ) : null}
        <div>
          Register
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <input
                type="text"
                required
                onChange={this.handleChangeUsername}
                placeholder="Username"
                value={this.state.username}
              />
            </div>
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
            <input type="submit" value="Register" />
          </form>
          <div>
            <Link to="/login">Login?</Link>
          </div>
        </div>
      </div>
    );
  }
}

/* Register.propTypes = {
  auth: PropTypes.object.isRequired,
}; */

/* function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
} */

export default Register;
