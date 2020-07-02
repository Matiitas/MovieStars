import React, { Component } from "react";
import Navbar from "./navbar";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    );
  }
}

export default MovieDetail;
