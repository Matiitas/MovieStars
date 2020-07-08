import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: "text",
      user: undefined,
      isFetching: true,
      name: "",
      birthDate: "",
      country: "",
      city: "",
      profileImage: "",
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
          profileImage: this.state.user.profileImage,
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
  handleImageChange = (event) => {
    this.setState({ profileImage: event.target.files[0] });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("State", this.state);

    const bodyFormData = new FormData();
    bodyFormData.append("profileImage", this.state.profileImage);
    bodyFormData.append("name", this.state.name);
    bodyFormData.append("country", this.state.country);
    bodyFormData.append("city", this.state.city);
    bodyFormData.append("birthDate", this.state.birthDate);

    axios
      .post("http://localhost:5000/api/v1/users/profile/edit", bodyFormData)
      .then((response) => {
        console.log(response);
        this.props.history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFocus = () => {
    this.setState({ dateType: "date" });
  };

  handleBlur = () => {
    this.setState({ dateType: "text" });
  };

  render() {
    return (
      <div>
        <Navbar />
        {this.state.isFetching ? (
          <div>
            <h1>Loading</h1>
          </div>
        ) : (
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
                  type="text"
                  onChange={this.handleNameChange}
                  placeholder={
                    this.state.user.name ? this.state.user.name : "Name"
                  }
                />
              </div>
              <div className="form-group row">
                <label>Birth Date</label>
                <input
                  type={this.state.dateType}
                  onChange={this.handleBirthChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder={this.state.user.birthDate.split("T")[0]}
                />
              </div>
              <div className="form-group row">
                <label>Country</label>
                <input
                  type="text"
                  onChange={this.handleCountryChange}
                  placeholder={
                    this.state.user.country
                      ? this.state.user.country
                      : "Country"
                  }
                />
              </div>
              <div className="form-group row">
                <label>City</label>
                <input
                  type="text"
                  onChange={this.handleCityChange}
                  placeholder={
                    this.state.user.city ? this.state.user.city : "City"
                  }
                />
              </div>
              <div className="form-group row">
                <label>Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  onChange={this.handleImageChange}
                />
              </div>
              <input type="submit" value="Edit" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default EditProfile;
