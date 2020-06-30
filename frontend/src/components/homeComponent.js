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
          this.setState({ movies: response.data.Search });
        } else {
          this.setState({ movies: [] });
        }
        console.log("movies state: ", this.state.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const fetchData = async () => {
      try {
        const promises = await getMoviesWithWord("Harry");
        if (promises === undefined) {
          return;
        } else {
          const result = [];
          Promise.all(promises)
            .then((movies) => {
              movies.forEach((movie) => {
                if (movie.status === 200) {
                  result.push(movie.data);
                }
              });
              console.log("Antes de hacer el setState: ", result);
              this.setState({ movies: result });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (e) {
        console.log("Not Found", e);
      }
    };
    fetchData();
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
