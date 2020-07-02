import React, { Component } from "react";
import NavBar from "./navbar";
import MoviesContainer from "./moviesContainer";
import { getMoviesWithWord } from "../utils/omdbRequest";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  componentDidMount() {
    getMoviesWithWord("Harry")
      .then((result) => {
        this.setState({ movies: result, isFetching: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isFetching: false });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default Home;
