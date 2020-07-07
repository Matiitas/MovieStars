import React, { Component } from "react";
import Navbar from "./navbar";
import "../assets/styles/profile.css";
import imageProfile from "../assets/img/profile.png";
import MoviesContainer from "./moviesContainer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMoviesByArrayOfID } from "../utils/omdbRequest";

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
    } catch {
      console.log("Algo paso en el try que no se pudo realizar");
    }
  }

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
                <button className="btn btn-primary">Edit Profile</button>
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
                      <td className="col-sm-7">Matias Caballero</td>
                    </tr>
                    <tr>
                      <td>Birthday</td>
                      <td className="col-sm-7">9 March</td>
                    </tr>
                  </tbody>
                </table>
                <div className="profile-image-container">
                  <img
                    className="profile-image"
                    src={imageProfile}
                    alt="Profile"
                  />
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
