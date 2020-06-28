import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";
import OrderBar from "./orderBar";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* componentDidMount() {
    axios({
      method: "get",
      url: "http://www.omdbapi.com/?apikey=7ef8a59d&s=Pirates of the",
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  render() {
    return (
      <React.Fragment>
        <NavBar onSearch={this.handleSearch} />
        <OrderBar />
      </React.Fragment>
    );
  }
}

export default Home;
