import React, { Component } from "react";
import NavBar from "./navbar";
import MoviesContainer from "./moviesContainer";
import "../assets/styles/home.css";
import { getMoviesByID } from "../utils/omdbRequest";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="welcome-message">
          <div className="welcome-container">
            <h1>
              Welcome to MovieStars, a page to search for the movies which you
              want to know about.
            </h1>
          </div>
        </div>
        <div className="welcome-message">
          <div className="welcome-container">
            <h2>Down here are some movies that i recommend, enjoy yourself.</h2>
          </div>
        </div>
        <div className="arrow-wrapper">
          <div className="arrow-container">
            <div className="arr arr-down"></div>
          </div>
        </div>
        <MoviesContainer searchWord="Harry Potter" />
        <br />
        <MoviesContainer searchWord="Pirates" />
        <br />
        <MoviesContainer searchWord="The lord of the rings" />
        <br />
        <MoviesContainer searchWord="Resident" />
      </div>
    );
  }
}

export default Home;
