import React, { Component } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../assets/styles/profile.css";
import MoviesContainer from "./moviesContainer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLoggedUserData } from "../utils/backendRequest";
import { ImageIcon } from "@primer/octicons-react";
import Loading from "./loading";
import Footer from "./footer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      isGuest: true,
      isFetching: true,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const user = await getLoggedUserData();
      this.setState({ user: user.data, isFetching: false });
    } catch (e) {
      this.setState({ isFetching: false });
    }
  };

  handleImageChange = (event) => {
    const bodyFormData = new FormData();
    bodyFormData.append("profileImage", event.target.files[0]);
    axios
      .post(
        "http://localhost:5000/api/v1/users/profile/edit-image",
        bodyFormData
      )
      .then((response) => {
        let user = this.state.user;
        user.profileImage = response.data.newProfileImageName;
        this.setState({ user: user });
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <Navbar />
            {this.state.user ? (
              <div className="profile-global-wrapper">
                <div className="profile-username-edit-button">
                  <span>{this.state.user.username} </span>
                  <Link to="/profile/edit">
                    <button className="btn btn-primary">Edit Profile</button>
                  </Link>
                </div>
                <div className="profile-info-wrapper">
                  <table className="table table-condensed profile-table col-sm-8 mb-0">
                    <tbody>
                      <tr>
                        <td>Username</td>
                        <td className="col-sm-7">
                          {this.state.user.username}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td className="col-sm-7">{this.state.user.email}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td className="col-sm-7">
                          {this.state.user.name ? this.state.user.name : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>Birth Date</td>
                        <td className="col-sm-7">
                          {this.state.user.birthDate
                            ? this.state.user.birthDate.split("T")[0]
                            : "N/A"}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td className="col-sm-7">
                          {this.state.user.country
                            ? this.state.user.country
                            : "N/A"}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td className="col-sm-7">
                          {this.state.user.city ? this.state.user.city : "N/A"}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="profile-image-container">
                    <img
                      className="profile-image"
                      src={
                        "http://localhost:5000/uploads/" +
                        this.state.user.profileImage
                      }
                      alt="Profile"
                    />
                    <label className="btn btn-primary btn-sm mt-2">
                      <ImageIcon size={24} />
                      <input
                        className="profile-image-input"
                        type="file"
                        name="profileImage"
                        onChange={this.handleImageChange}
                      />
                      Profile Image
                    </label>
                  </div>
                </div>
                {this.state.user.movies.length > 0 ? (
                  <React.Fragment>
                    {" "}
                    <div className="favorite-movies">
                      <span>Favorite Movies</span>
                    </div>
                    <MoviesContainer
                      movies={this.state.user.movies}
                      order="normal"
                    />
                  </React.Fragment>
                ) : (
                  <div className="favorite-movies text-center">
                    <span>You don't have favorite movies</span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2>Something went wrong!</h2>
              </div>
            )}

            <Footer />
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Profile);
