import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import Footer from "./footer";
import Loading from "./loading";
import { getLoggedUserData } from "../utils/backendRequest";
import { Link } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      name: "",
      birthDate: "",
      country: "",
      city: "",
      errors: {
        name: false,
        city: false,
        country: false,
        birthDate: false,
      },
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const user = await getLoggedUserData();
      this.setState({
        isFetching: false,
        name: user.data.name,
        birthDate: user.data.birthDate,
        country: user.data.country,
        city: user.data.city,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleBirthChange = (event) => {
    this.setState({ birthDate: event.target.value });
  };
  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };
  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };

  validateInputs = (input) => {
    if (input === "" || input === undefined) {
      return true;
    } else {
      const pattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      return pattern.test(input);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let name = this.state.name;
    let city = this.state.city;
    let country = this.state.country;
    let birthDate = this.state.birthDate;

    const errors = this.state.errors;

    const validName = this.validateInputs(name);
    const validCity = this.validateInputs(city);
    const validCountry = this.validateInputs(country);

    const formInputs = {};

    if (validName) {
      formInputs.name = name;
      errors.name = false;
    } else {
      errors.name = true;
    }
    if (validCity) {
      formInputs.city = city;
      errors.city = false;
    } else {
      errors.city = true;
    }
    if (validCountry) {
      formInputs.country = country;
      errors.country = false;
    } else {
      errors.country = true;
    }

    formInputs.birthDate = birthDate;

    if (!validName || !validCity || !validCountry) {
      this.setState({ errors: errors });
    } else {
      axios
        .post("http://localhost:5000/api/v1/users/profile/edit", formInputs)
        .then((response) => {
          this.props.history.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        {this.state.isFetching ? (
          <Loading />
        ) : (
          <div className="container pt-5">
            <div className="container-forms">
              <div className="wrap-forms-box mt-5 mb-5">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="font-weight-bold">Name</label>
                    <div
                      className={
                        this.state.errors.name
                          ? "input-border-invalid"
                          : "input-border-valid"
                      }
                    >
                      <input
                        className="form-control"
                        maxLength="32"
                        type="text"
                        onChange={this.handleNameChange}
                        value={this.state.name ? this.state.name : ""}
                      />
                    </div>
                    <div
                      className="invalid-feedback"
                      style={{
                        display: this.state.errors.name ? "block" : "none",
                      }}
                    >
                      Enter a valid name
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="font-weight-bold">Birth Date</label>
                    <div className="input-border-valid">
                      <input
                        className="form-control"
                        min="01-01-1900"
                        max="01-01-2030"
                        type="date"
                        onChange={this.handleBirthChange}
                        value={
                          this.state.birthDate
                            ? this.state.birthDate
                                .toLocaleString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="font-weight-bold">Country</label>
                    <div
                      className={
                        this.state.errors.country
                          ? "input-border-invalid"
                          : "input-border-valid"
                      }
                    >
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleCountryChange}
                        value={this.state.country ? this.state.country : ""}
                      />
                    </div>
                    <div
                      className="invalid-feedback"
                      style={{
                        display: this.state.errors.country ? "block" : "none",
                      }}
                    >
                      Enter a valid country
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="font-weight-bold">City</label>
                    <div
                      className={
                        this.state.errors.city
                          ? "input-border-invalid"
                          : "input-border-valid"
                      }
                    >
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleCityChange}
                        value={this.state.city ? this.state.city : ""}
                      />
                    </div>
                    <div
                      className="invalid-feedback"
                      style={{
                        display: this.state.errors.city ? "block" : "none",
                      }}
                    >
                      Enter a valid city
                    </div>
                  </div>
                  <div
                    className="form-group row d-flex pt-3"
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div className="wrap-forms-button">
                      <div className="border-forms-button">
                        <input
                          className="btn btn-light"
                          type="submit"
                          value="Edit"
                        />
                      </div>
                    </div>

                    <div className="wrap-forms-button">
                      <div className="border-forms-button">
                        <Link to="/profile">
                          <span className="btn btn-secondary">Cancel</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default EditProfile;
