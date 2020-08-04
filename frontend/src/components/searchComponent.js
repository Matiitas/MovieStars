import React, { Component } from "react";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";
import { getAllMoviesWithWord } from "../utils/omdbRequest";
import { getMoviesWithTitle } from "../utils/backendRequest";
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
    console.log("Didmount searchComp");
    const { searchWord } = this.props.match.params;
    this.setState({ searchWord: searchWord });
    getMoviesWithTitle(searchWord)
      .then((result) => {
        this.setState({
          movies: result.data.movies,
          isFetching: false,
          order: "normal",
        });
      })
      .catch((err) => console.log(err));
  }

  /* componentDidUpdate(prevProps, prevState) {
    console.log("Didupdate searchComp");
    const { searchWord } = this.props.match.params;
    if (prevState.searchWord !== searchWord) {
      this.setState({ searchWord: searchWord, isFetching: true });
      getMoviesWithTitle(searchWord)
        .then((result) => {
          this.setState({
            movies: result.data.movies,
            isFetching: false,
            order: "normal",
          });
        })
        .catch((err) => console.log(err));
    }
  } */

  handleOrder = (value) => {
    this.setState({ order: value });
  };

  render() {
    /* const { searchWord } = this.props.match.params; */
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
            <MoviesContainer
              movies={this.state.movies}
              order={this.state.order}
            />
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  }
}

export default Search;
