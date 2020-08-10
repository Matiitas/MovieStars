import React, { Component } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import MoviesContainer from "./moviesContainer";
import "../assets/styles/home.css";
import { getMoviesForHome } from "../utils/backendRequest";
import Loading from "./loading";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: true,
      isFetching: true,
      thriller: undefined,
      bizarre: undefined,
      cult: undefined,
      recommendedThriller: [
        "tt0364569",
        "tt1190539",
        "tt6751668",
        "tt4016934",
        "tt0353969",
        "tt1588170",
        "tt6493286",
        "tt6788942",
      ],
      recommendedBizarre: [
        "tt7914416",
        "tt10589914",
        "tt0365376",
        "tt0312843",
        "tt0235198",
        "tt1632547",
        "tt0290329",
        "tt0492784",
      ],
      recommendedCult: [
        "tt0066921",
        "tt0050083",
        "tt0081505",
        "tt0047478",
        "tt0110912",
        "tt0119698",
        "tt0111161",
        "tt0071853",
      ],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchMovies();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchMovies = async () => {
    try {
      const thriller = await getMoviesForHome(this.state.recommendedThriller);
      const cult = await getMoviesForHome(this.state.recommendedCult);
      const bizarre = await getMoviesForHome(this.state.recommendedBizarre);
      if (
        thriller.data.movies.length > 0 ||
        cult.data.movies.length > 0 ||
        bizarre.data.movies.length > 0
      ) {
        if (this._isMounted) {
          this.setState({
            thriller: thriller.data.movies,
            cult: cult.data.movies,
            bizarre: bizarre.data.movies,
            isFetching: false,
          });
        }
      } else {
        this.setState({ recommend: false, isFetching: false });
      }
    } catch (e) {
      this.setState({ recommend: false, isFetching: false });
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.state.isFetching ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className="welcome-message">
              <div className="welcome-container">
                <h2>
                  Welcome to MovieStars, a page to search for the movies which
                  you want to know about.
                </h2>
              </div>
            </div>
            <div className="welcome-message">
              <div className="welcome-container">
                <h3>
                  Down here are some movies that i recommend, enjoy yourself.
                </h3>
              </div>
            </div>
            <div className="arrow-wrapper">
              <div className="arrow-container">
                <div className="arr arr-down"></div>
              </div>
            </div>
            {this.state.thriller && this.state.thriller.length > 0 ? (
              <MoviesContainer movies={this.state.thriller} />
            ) : null}
            {this.state.bizarre && this.state.bizarre.length > 0 ? (
              <MoviesContainer movies={this.state.bizarre} />
            ) : null}
            {this.state.cult && this.state.cult.length > 0 ? (
              <MoviesContainer movies={this.state.cult} />
            ) : null}
            {this.state.recommend ? null : (
              <div
                className="welcome-message"
                style={{ marginBottom: "150px" }}
              >
                <div className="welcome-container">
                  <h2>No movies recommended</h2>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  }
}

export default Home;
