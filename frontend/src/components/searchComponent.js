import React, { Component } from "react";
import NavBar from "./navbar";
import OrderBar from "./orderBar";
import MoviesContainer from "./moviesContainer";
import { getMoviesWithTitle } from "../utils/backendRequest";
import Footer from "./footer";
import Loading from "./loading";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "normal",
      movies: [],
      isFetching: true,
      searchWord: "",
    };
  }

  componentDidMount() {
    const { searchWord } = this.props.match.params;
    this.setState({ searchWord: searchWord });
    getMoviesWithTitle(searchWord)
      .then((result) => {
        this.setState({
          movies: result.data.movies,
          isFetching: false,
        });
      })
      .catch((err) => {
        this.setState({ isFetching: false });
      });
  }

  handleOrder = (value) => {
    this.setState({ order: value });
  };

  render() {
    const { searchWord } = this.props.match.params;
    return (
      <div>
        <NavBar />
        {this.state.isFetching ? (
          <Loading />
        ) : (
          <React.Fragment>
            <OrderBar onClick={this.handleOrder} />
            <div
              style={{
                display: "flex",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ width: "80%" }}>Results for: {searchWord} </h2>
            </div>
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
