import React, { Component } from "react";
import Navbar from "./navbar";
import "../assets/styles/details.css";
import { getMoviesByID } from "../utils/omdbRequest";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PopUp from "./popup";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      isFetching: true,
      showPopup: false,
    };
  }

  componentDidMount() {
    const { imdbID } = this.props.match.params;
    getMoviesByID(imdbID)
      .then((res) => {
        console.log("Esta es la res", res);
        this.setState({ movie: res.data, isFetching: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClickFavorites = () => {
    console.log("hace algo?");
    this.setState({ showPopup: true });
  };

  handleCloseModal = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const message = "You need to be logged in to perform this action.";
    return (
      <div>
        <Navbar></Navbar>
        {this.state.isFetching ? (
          <h1>Loading</h1>
        ) : (
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
                      src={this.state.movie.Poster}
                      alt={this.state.movie.Title}
                    />
                    {
                      <button
                        className="button-favorites"
                        onClick={this.handleClickFavorites}
                      >
                        Add to Favorites
                      </button>
                    }
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
        )}
      </div>
    );
  }
}

function renderListMoreInfo(movie) {
  return (
    <ul className="movie-details-list">
      <li>
        <h5>Plot:</h5>
        <h6> {movie.Plot ? movie.Plot : "N/A"}</h6>
      </li>
      <li>
        <h5>Writer:</h5>

        <h6> {movie.Writer ? movie.Writer : "N/A"}</h6>
      </li>
      <li>
        <h5>Production:</h5>

        <h6> {movie.Production ? movie.Production : "N/A"}</h6>
      </li>
      <li>
        <h5>Language:</h5>

        <h6> {movie.Language ? movie.Language : "N/A"}</h6>
      </li>
      <li>
        <h5>Rated:</h5>
        <h6> {movie.Rated ? movie.Rated : "N/A"}</h6>
      </li>
      <li>
        <h5>Awards:</h5>
        <h6> {movie.Awards ? movie.Awards : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        <h6> {movie.imdbRating ? movie.imdbRating : "N/A"}</h6>
      </li>
      <li>
        <h5>Rotten Tomatoes:</h5>
        <h6> {movie.Ratings[1] ? movie.Ratings[1].Value : "N/A"}</h6>
      </li>
      <li>
        <h5>Metacritic:</h5>
        <h6> {movie.Metascore ? movie.Metascore : "N/A"}</h6>
      </li>
    </ul>
  );
}

function renderListResumen(movie) {
  return (
    <ul className="movie-details-list">
      <li className="justify-content-center">
        <h3 className="font-weight-bold">{movie.Title}</h3>
      </li>
      <li>
        <h5>Year:</h5>
        <h6> {movie.Year ? movie.Year : "N/A"}</h6>
      </li>
      <li>
        <h5>Duration:</h5>

        <h6> {movie.Runtime ? movie.Runtime : "N/A"}</h6>
      </li>
      <li>
        <h5>Genre:</h5>

        <h6> {movie.Genre ? movie.Genre : "N/A"}</h6>
      </li>
      <li>
        <h5>Director:</h5>

        <h6> {movie.Director ? movie.Director : "N/A"}</h6>
      </li>
      <li>
        <h5>Actors:</h5>
        <h6> {movie.Actors ? movie.Actors : "N/A"}</h6>
      </li>
      <li>
        <h5>Country:</h5>

        <h6> {movie.Country ? movie.Country : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        {movie.imdbID ? (
          <a
            target="_blank"
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
