import React, { Component } from "react";
import "../assets/styles/moviesContainer.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import RenderPagination from "./renderPagination";
import Poster from "./poster";

interface IRecipeProps extends RouteComponentProps {
  searchWord: string;
  order: string;
  movies: any[];
}

interface IRecipeState {
  movies: any[];
  isFetching: boolean;
  cantPages: number;
  actualPage: number;
  moviesFound: boolean;
  moviesPerPage: any[];
}

class MoviesContainer extends Component<IRecipeProps, IRecipeState> {
  constructor(props: IRecipeProps) {
    super(props);
    this.state = {
      movies: [],
      isFetching: true,
      cantPages: 0,
      actualPage: 1,
      moviesFound: false,
      moviesPerPage: [],
    };
  }

  componentDidMount() {
    if (this.props.movies.length > 0) {
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.movies.length / 40); i++) {
        pageNumbers.push(i);
      }
      const orderedMovies = this.sortMovies(this.props.order);
      this.setState({ movies: orderedMovies }, () =>
        this.sliceMovies(1, "state")
      );

      this.setState({
        cantPages: Math.ceil(this.props.movies.length / 40),
        isFetching: false,
        moviesFound: true,
      });
      window.scrollTo(0, 0);
    } else {
      this.setState({ moviesFound: false, isFetching: false });
    }
  }

  componentDidUpdate(prevProps: IRecipeProps, prevState: IRecipeState) {
    if (prevProps.order !== this.props.order) {
      let orderedMovies = this.sortMovies(this.props.order);
      this.setState({ movies: orderedMovies }, () =>
        this.sliceMovies(1, "state")
      );
    }
  }

  sortMovies = (order: string) => {
    let arr: any[] = [];
    arr = [...this.props.movies];
    switch (order) {
      case "alphabetic":
        arr.sort((a, b) => {
          if (a.title <= b.title) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "imdbRatingDesc":
        arr.sort((a, b) => {
          if (a.imdbRating === "N/A") {
            return 1;
          } else {
            if (a.imdbRating >= b.imdbRating) {
              return 1;
            } else {
              return -1;
            }
          }
        });
        break;
      case "imdbRatingAsc":
        arr.sort((a, b) => {
          if (a.imdbRating === "N/A") {
            return 1;
          } else {
            if (a.imdbRating <= b.imdbRating) {
              return 1;
            } else {
              return -1;
            }
          }
        });
        break;
      case "yearDesc":
        arr.sort((a, b) => {
          if (a.year >= b.year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "yearAsc":
        arr.sort((a, b) => {
          if (a.year <= b.year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      default:
        break;
    }
    return arr;
  };

  sliceMovies = (page: number, election: string) => {
    let arr: any[] = [];
    switch (election) {
      case "props":
        arr = this.props.movies.slice((page - 1) * 40, page * 40);
        break;
      case "state":
        arr = this.state.movies.slice((page - 1) * 40, page * 40);
    }
    this.setState({ moviesPerPage: arr, actualPage: page });
  };

  handleViewDetails = (imdbID: string) => {
    this.props.history.push("/movie/" + imdbID);
  };

  handlePageChange = (page: number) => {
    this.sliceMovies(page, "state");
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="movies-wrapper">
        <div className="posters-wrapper">
          {this.state.isFetching ? (
            <h1>Loading Movies</h1>
          ) : this.state.moviesFound ? (
            this.state.moviesPerPage.map((movie) => {
              return (
                <Poster
                  onClick={this.handleViewDetails}
                  key={movie._id}
                  movie={movie}
                />
              );
            })
          ) : (
            <h1>No results found!</h1>
          )}
          {!this.state.moviesFound ||
          this.state.isFetching ||
          this.state.cantPages <= 1 ? null : (
            <RenderPagination
              actualPage={this.state.actualPage}
              cantPages={this.state.cantPages}
              handlePageChange={this.handlePageChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(MoviesContainer);
