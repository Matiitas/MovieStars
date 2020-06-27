import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://www.omdbapi.com/?apikey=7ef8a59d" + "&s=Pirates of the",
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
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>Home es aqui</h1>
      </div>
    );
  }
}

export default Home;
