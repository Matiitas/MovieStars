import React, { useState, useEffect, Component } from "react";
import "../assets/styles/moviesContainer.css";
import { withRouter } from "react-router-dom";
import { getMoviesWithWord } from "../utils/omdbRequest";

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined,
      isFetching: true,
    };
  }

  componentDidMount() {
    console.log("entro al didmount");
    getMoviesWithWord(this.props.searchWord)
      .then((result) => {
        this.setState({ movies: result, isFetching: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchWord !== this.props.searchWord) {
      getMoviesWithWord(this.props.searchWord)
        .then((result) => {
          this.sortMovies(result, "normal");
          this.setState({ movies: result, isFetching: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (prevProps.order !== this.props.order) {
      let arr = this.state.movies;
      this.sortMovies(arr, this.props.order);
      this.setState({ movies: arr });
    }
  }

  sortMovies = (movies, order) => {
    switch (order) {
      case "alphabetic":
        movies.sort((a, b) => {
          if (a.Title <= b.Title) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "imdbRatingDesc":
        movies.sort((a, b) => {
          if (a.imdbRating >= b.imdbRating) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "imdbRatingAsc":
        movies.sort((a, b) => {
          if (a.imdbRating <= b.imdbRating) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "yearDesc":
        movies.sort((a, b) => {
          if (a.Year >= b.Year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "yearAsc":
        movies.sort((a, b) => {
          if (a.Year <= b.Year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      default:
        break;
    }
  };

  handleViewDetails = (imdbID) => {
    this.props.history.push("/movie/" + imdbID);
  };

  render() {
    return (
      <div className="movies-wrapper">
        <div className="posters-wrapper">
          {this.state.isFetching ? (
            <h1>Loading Movies</h1>
          ) : this.state.movies !== undefined ? (
            this.state.movies.map((movie) => {
              return (
                <Poster
                  onClick={this.handleViewDetails}
                  key={movie.imdbID}
                  movie={movie}
                  render={this.props.order}
                />
              );
            })
          ) : (
            <h1>No results found!</h1>
          )}
        </div>
      </div>
    );
  }
}

function Poster(props) {
  const [hoverActivo, sethoverActivo] = useState(false);
  const [activeLeaveAnimation, setactiveLeaveAnimation] = useState(false);

  const handleEnter = () => {
    sethoverActivo(true);
    setactiveLeaveAnimation(true);
  };

  const handleLeave = () => {
    sethoverActivo(false);
  };

  useEffect(() => {
    sethoverActivo(false);
    setactiveLeaveAnimation(false);
  }, [props.render]);

  return (
    <div
      className="poster-container"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="image-container">
        <img
          className="poster-img"
          src={props.movie.Poster}
          alt={props.movie.Title}
        />
        {hoverActivo ? (
          <HoverPoster onClick={props.onClick} movie={props.movie} />
        ) : activeLeaveAnimation ? (
          <LeavePoster onClick={props.onClick} movie={props.movie} />
        ) : null}
      </div>
      {/* {hoverActivo ? props.children : null} */}
    </div>
  );
}

function PosterInfo(props) {
  return (
    <ul>
      <li>
        <h5>{props.movie.Title}</h5>
      </li>
      <li>
        <button onClick={() => props.onClick(props.movie.imdbID)}>
          View Details
        </button>
      </li>
      <li>
        <h6>Duration: {props.movie.Runtime}</h6>
      </li>
      <li>
        <h6>Year: {props.movie.Year}</h6>
      </li>
      <li>
        <h6>{props.movie.Plot}</h6>
      </li>
      <li>
        <h6>Genre: {props.movie.Genre}</h6>
      </li>
    </ul>
  );
}

function LeavePoster(props) {
  return (
    <div className="container-fluid poster-leave">
      <PosterInfo onClick={props.onClick} movie={props.movie} />
    </div>
  );
}

function HoverPoster(props) {
  return (
    <div className="container-fluid poster-hover">
      <PosterInfo onClick={props.onClick} movie={props.movie} />
    </div>
  );
}

export default withRouter(MoviesContainer);
