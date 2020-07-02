import React, { Component } from "react";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "normal",
    };
  }

  handleOrder = (value) => {
    this.setState({ order: value });
  };

  render() {
    const { searchWord } = this.props.match.params;
    return (
      <div>
        <NavBar />
        <OrderBar onClick={this.handleOrder} />
        <MoviesContainer searchWord={searchWord} order={this.state.order} />
      </div>
    );
  }
}

export default Search;
