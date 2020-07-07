import React, { Component } from "react";
import NavBar from "./navbar";
import MoviesContainer from "./moviesContainer";
import "../assets/styles/home.css";
import { getMoviesFromArrayOfTitles } from "../utils/omdbRequest";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      thriller: undefined,
      bizarre: undefined,
      cult: undefined,
      recommendedThriller: [
        "Oldboy",
        "The Chaser",
        "Parasite",
        "Handmaiden",
        "Memories Of Murder",
        "I saw the devil",
        "1987: When the day comes",
        "Bad Genius",
      ],
      recommendedBizarre: [
        "One Cut of the dead",
        "The forest of love",
        "A  tale of two sisters",
        "suicide club",
        "audition",
        "cold fish",
        "visitor q",
        "Strange Circus",
      ],
      recommendedCult: [
        "A Clockwork Orange",
        "12 Angry Men",
        "The shining",
        "Seven Samurai",
        "Pulp fiction",
        "Princess Mononoke",
        "The Shawshank Redemption",
        "Monty Python and the Holy Grail",
      ],
    };
  }

  async componentDidMount() {
    try {
      const thrillers = await getMoviesFromArrayOfTitles(
        this.state.recommendedThriller
      );
      const bizarres = await getMoviesFromArrayOfTitles(
        this.state.recommendedBizarre
      );
      const cults = await getMoviesFromArrayOfTitles(
        this.state.recommendedCult
      );

      if (thrillers) {
        this.setState({ thriller: thrillers });
      }
      if (bizarres) {
        this.setState({ bizarre: bizarres });
      }
      if (cults) {
        this.setState({ cult: cults });
      }
      this.setState({ isFetching: false });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.isFetching ? (
          <div>
            <h2>No movies recommended.</h2>
          </div>
        ) : (
          <React.Fragment>
            <NavBar />
            <div className="welcome-message">
              <div className="welcome-container">
                <h1>
                  Welcome to MovieStars, a page to search for the movies which
                  you want to know about.
                </h1>
              </div>
            </div>
            <div className="welcome-message">
              <div className="welcome-container">
                <h2>
                  Down here are some movies that i recommend, enjoy yourself.
                </h2>
              </div>
            </div>
            <div className="arrow-wrapper">
              <div className="arrow-container">
                <div className="arr arr-down"></div>
              </div>
            </div>
            {this.state.thriller ? (
              <MoviesContainer movies={this.state.thriller} />
            ) : null}
            {this.state.bizarre ? (
              <MoviesContainer movies={this.state.bizarre} />
            ) : null}
            {this.state.cult ? (
              <MoviesContainer movies={this.state.cult} />
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
