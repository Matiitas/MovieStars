import React, { Component } from "react";
import "../assets/styles/register.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
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
    //cuando envian el form se acciona esto
    event.preventDefault(); //prevent html form submit comportamiento
    axios
      .post("http://localhost:5000/api/v1/users/register", this.state)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          this.setState({ error: response.data.error, password: "" });
        } else {
          this.props.history.push("/login");
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="outter-box">
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
