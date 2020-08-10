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
                  {renderListResumen(this.state.movie)}
                </div>
              </div>
            </div>
            <div className="second-row">
              <div className="wrapper-second">
                {renderListMoreInfo(this.state.movie)}
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

function renderListMoreInfo(movie) {
  return (
    <ul className="movie-details-list">
      <li>
        <h5>Plot:</h5>
        <h6> {movie.plot ? movie.plot : "N/A"}</h6>
      </li>
      <li>
        <h5>Writer:</h5>

        <h6> {movie.writer ? movie.writer : "N/A"}</h6>
      </li>
      <li>
        <h5>Production:</h5>

        <h6> {movie.production ? movie.production : "N/A"}</h6>
      </li>
      <li>
        <h5>Language:</h5>

        <h6> {movie.language ? movie.language : "N/A"}</h6>
      </li>
      <li>
        <h5>Rated:</h5>
        <h6> {movie.rated ? movie.rated : "N/A"}</h6>
      </li>
      <li>
        <h5>Awards:</h5>
        <h6> {movie.awards ? movie.awards : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        <h6> {movie.imdbRating ? movie.imdbRating : "N/A"}</h6>
      </li>
      <li>
        <h5>Rotten Tomatoes:</h5>
        <h6> {movie.ratings[1] ? movie.ratings[1].Value : "N/A"}</h6>
      </li>
      <li>
        <h5>Metacritic:</h5>
        <h6> {movie.ratings[2] ? movie.ratings[2].Value : "N/A"}</h6>
      </li>
    </ul>
  );
}

function renderListResumen(movie) {
  return (
    <ul className="movie-details-list">
      <li className="justify-content-center">
        <h3 className="font-weight-bold">{movie.title}</h3>
      </li>
      <li>
        <h5>Year:</h5>
        <h6> {movie.year ? movie.year : "N/A"}</h6>
      </li>
      <li>
        <h5>Duration:</h5>

        <h6> {movie.runtime ? movie.runtime : "N/A"}</h6>
      </li>
      <li>
        <h5>Genre:</h5>

        <h6> {movie.genre ? movie.genre : "N/A"}</h6>
      </li>
      <li>
        <h5>Director:</h5>

        <h6> {movie.director ? movie.director : "N/A"}</h6>
      </li>
      <li>
        <h5>Actors:</h5>
        <h6> {movie.actors ? movie.actors : "N/A"}</h6>
      </li>
      <li>
        <h5>Country:</h5>

        <h6> {movie.country ? movie.country : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        {movie.imdbID ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.imdb.com/title/" + movie.imdbID}
          >
            <h5>{movie.imdbID}</h5>
          </a>
        ) : (
          "N/A"
        )}
      </li>
    </ul>
  );
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
