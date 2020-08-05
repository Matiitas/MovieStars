import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import Footer from "./footer";
import Loading from "./loading";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
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
    axios
      .get("http://localhost:5000/api/v1/users/me")
      .then((response) => {
        this.setState({ user: response.data, isFetching: false });
        this.setState({
          name: this.state.user.name,
          birthDate: this.state.user.birthDate,
          country: this.state.user.country,
          city: this.state.user.city,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

    console.log("valid name: ", validName);

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
    this.setState({ errors: errors });

    console.log("State", this.state);

    if (!validName || !validCity || !validCountry) {
      console.log("Input invalido");
    } else {
      axios
        .post("http://localhost:5000/api/v1/users/profile/edit", formInputs)
        .then((response) => {
          console.log(response);
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
          <React.Fragment>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Edit Profile
              <form
                onSubmit={this.handleSubmit}
                style={{ position: "relative", top: "200px" }}
              >
                <div className="form-group row">
                  <label>Name</label>
                  <input
                    /* className="form-control is-invalid" */
                    maxLength="32"
                    type="text"
                    onChange={this.handleNameChange}
                    value={this.state.name ? this.state.name : ""}
                    placeholder="Name"
                  />
                  {/* <div className="invalid-feedback">
                  Please provide a valid city.
                </div> */}
                </div>
                <div className="form-group row">
                  <label>Birth Date</label>
                  <input
                    min="01-01-1900"
                    max="01-01-2030"
                    type="date"
                    onChange={this.handleBirthChange}
                    value={
                      this.state.birthDate
                        ? this.state.birthDate.toLocaleString().split("T")[0]
                        : ""
                    }
                  />
                </div>
                <div className="form-group row">
                  <label>Country</label>
                  <input
                    type="text"
                    onChange={this.handleCountryChange}
                    value={this.state.country ? this.state.country : ""}
                    placeholder="Country"
                  />
                </div>
                <div className="form-group row">
                  <label>City</label>
                  <input
                    type="text"
                    onChange={this.handleCityChange}
                    value={this.state.city ? this.state.city : ""}
                    placeholder="City"
                  />
                </div>
                <input type="submit" value="Edit" />
              </form>
            </div>
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  }
}

export default EditProfile;
