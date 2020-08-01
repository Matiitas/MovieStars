import React, { Component } from "react";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";
import { getAllMoviesWithWord } from "../utils/omdbRequest";
import Footer from "./footer";
import Loading from "./loading";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "normal",
      movies: undefined,
      isFetching: true,
      searchWord: "",
    };
  }

  componentDidMount() {
    console.log("Corre el mount del searchComp");
    const { searchWord } = this.props.match.params;
    this.setState({ searchWord: searchWord });
    getAllMoviesWithWord(searchWord)
      .then((result) => {
        console.log("El result es: ", result);
        this.setState({ movies: result.result, isFetching: false });
      })
      .catch((err) =>
        console.log("No carga movies aunque las encuentra: ", err)
      );
  }

  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.searchWord !== this.state.searchWord) {
      getAllMoviesWithWord(this.state.searchWord)
        .then((result) => {
          console.log("El result es: ", result);
          this.setState({ movies: result.result, isFetching: false });
        })
        .catch((err) => console.log(err));
    }
  } */

  handleOrder = (value) => {
    this.setState({ order: value });
  };

  render() {
    const { searchWord, page } = this.props.match.params;
    return (
      <div>
        <NavBar />
        {this.state.isFetching ? (
          <Loading />
        ) : (
          <React.Fragment>
            <OrderBar onClick={this.handleOrder} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <MoviesContainer movies={this.state.movies} />
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  }
}

export default Search;
