import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
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
        this.setState({ movies: response.data.Search });
        console.log("movies state: ", this.state.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://www.omdbapi.com/?apikey=7ef8a59d&s=Harry",
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ movies: response.data.Search });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{ display: "block", height: "100vh" }}>
        <NavBar onSearch={this.handleSearch} />
        <OrderBar />
        <MoviesContainer movies={this.state.movies} />
      </div>
    );
  }
}

export default Home;
