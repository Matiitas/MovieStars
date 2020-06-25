import React, { Component } from "react";
import axios from "axios";
import NavBar from "./navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((res) => console.log(res.data))
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
