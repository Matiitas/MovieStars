import React, { Component } from "react";
import Navbar from "./navbar";
import "../assets/styles/details.css";
import Loading from "./loading";
import {
  getFavoriteMovies,
  addToFavorites,
  deleteFromFavorites,
  getMovieByImdbID,
} from "../utils/backendRequest";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PopUp from "./popup";
import Footer from "./footer";
import RenderListMoreInfo from "./renderListMoreInfo";
import RenderListResumen from "./renderListResumen";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      isFetching: true,
      showPopup: false,
      alreadyFavorite: false,
      wentWrong: false,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = async () => {
    try {
      const { imdbID } = this.props.match.params;
      const movie = await getMovieByImdbID(imdbID);
      if (movie.data.movie) {
        this.setState({ movie: movie.data.movie[0], isFetching: false }, () =>
          this.checkIfFavorite()
        );
      }
    } catch (e) {
      this.setState({ isFetching: false, wentWrong: true });
    }
  };

  checkIfFavorite = async () => {
    try {
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
        const favorites = await getFavoriteMovies();
        if (favorites.data.movies.includes(this.state.movie._id)) {
          this.setState({ alreadyFavorite: true });
        }
      }
    } catch (e) {
      this.setState({ wentWrong: true });
    }
  };

  handleClickFavorites = async () => {
    try {
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
        await addToFavorites(this.state.movie._id);
        this.setState({ alreadyFavorite: true });
      } else {
        this.setState({ showPopup: true });
      }
    } catch (e) {
      this.setState({ wentWrong: true });
    }
  };

  handleDeleteFavorite = async () => {
    try {
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
        await deleteFromFavorites(this.state.movie._id);
        this.setState({ alreadyFavorite: false });
      }
    } catch (e) {
      this.setState({ wentWrong: true });
    }
  };

  handleCloseModal = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const message = "You need to be logged in to perform this action.";
    return (
      <div>
        <Navbar />
        {this.state.isFetching ? (
          <Loading />
        ) : !this.state.wentWrong ? (
          <div className="global-wrapper">
            <div className="first-row">
              <div className="wrapper-poster">
                {this.state.showPopup ? (
                  <PopUp message={message} onClick={this.handleCloseModal} />
                ) : null}
                <div className="poster-container">
                  <div className="image-container">
                    <img
                      className="poster-img"
                      src={this.state.movie.poster}
                      alt={this.state.movie.title}
                    />
                    {this.state.alreadyFavorite && isAuthenticated ? (
                      <button
                        className="button-favorites"
                        onClick={this.handleDeleteFavorite}
                      >
                        <span style={{ fontSize: "18px" }}>
                          Remove from Favorites
                        </span>
                      </button>
                    ) : (
                      <button
                        className="button-favorites"
                        onClick={this.handleClickFavorites}
                      >
                        <span style={{ fontSize: "18px" }}>
                          Add to Favorites
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="wrapper-resumen">
                <div className="resumen-box">
                  <RenderListResumen movie={this.state.movie} />
                </div>
              </div>
            </div>
            <div className="second-row">
              <div className="wrapper-second">
                <RenderListMoreInfo movie={this.state.movie} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>Something went wrong!</h2>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

MovieDetail.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(MovieDetail);
