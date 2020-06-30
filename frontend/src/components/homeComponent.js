import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";
import { getMoviesWithWord } from "../utils/omdbRequest";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined,
      isFetching: true,
    };
  }

  handleSearch = (searchWord) => {
    axios({
      method: "get",
      url: "http://www.omdbapi.com/?apikey=7ef8a59d&s=" + searchWord,
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    })
      .then((response) => {
        console.log("Esta es la respuesta de la busqueda: ", response.data);
        if (response !== undefined) {
          this.setState({ movies: response.data.Search, isFetching: false });
        } else {
          this.setState({ isFetching: false });
        }
        console.log("movies state: ", this.state.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div style={{ display: "block", height: "100vh" }}>
        <NavBar onSearch={this.handleSearch} />
        <OrderBar />
        {this.state.isFetching ? (
          <h1 style={{ color: "white" }}>Loading Movies</h1>
        ) : (
          <MoviesContainer movies={this.state.movies} />
        )}
      </div>
    );
  }
}

export default Home;
