import React, { Component } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../assets/styles/profile.css";
import MoviesContainer from "./moviesContainer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMoviesByArrayOfID } from "../utils/omdbRequest";
import { ImageIcon } from "@primer/octicons-react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      isGuest: true,
      isFetching: true,
      movies: undefined,
    };
  }

  async componentDidMount() {
    try {
      const { userId } = this.props.match.params;
      if (!userId) {
        const user = await axios.get("http://localhost:5000/api/v1/users/me");
        if (user) {
          this.setState({ user: user.data });
          console.log("state", user.data);
          getMoviesByArrayOfID(user.data.movies)
            .then((response) => {
              this.setState({
                movies: response,
                isFetching: false,
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ isFetching: false });
            });
        }
      } else {
        //hago algo si entra un guest
      }
    } catch (e) {
      console.log("Algo paso en el try que no se pudo realizar", e);
    }
  }

  handleImageChange = (event) => {
    const bodyFormData = new FormData();
    bodyFormData.append("profileImage", event.target.files[0]);
    axios
      .post(
        "http://localhost:5000/api/v1/users/profile/edit-image",
        bodyFormData
      )
      .then((response) => {
        console.log("Response despues de cambiar img: ", response.data);
        let user = this.state.user;
        user.profileImage = response.data.newProfileImageName;
        this.setState({ user: user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <div>
            <h1>Loading</h1>
          </div>
        ) : (
          <div>
            <Navbar />
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
                      <td className="col-sm-7">{this.state.user.username} </td>
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
              {this.state.movies ? (
                <React.Fragment>
                  {" "}
                  <div className="favorite-movies">
                    <span>Favorite Movies</span>
                  </div>
                  <MoviesContainer movies={this.state.movies} />
                </React.Fragment>
              ) : (
                <div className="favorite-movies">
                  <span>You don't have favorite movies</span>
                </div>
              )}
            </div>
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
