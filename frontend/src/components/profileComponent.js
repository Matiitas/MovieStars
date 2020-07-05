import React, { Component } from "react";
import Navbar from "./navbar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {" "}
        <Navbar />{" "}
      </div>
    );
  }
}

export default Profile;
