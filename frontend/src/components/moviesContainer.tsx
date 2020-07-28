import React, { useState, useEffect, Component } from "react";
import "../assets/styles/moviesContainer.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getMoviesWithWord } from "../utils/omdbRequest";
import Pagination from "react-bootstrap/Pagination";

interface IRecipeProps extends RouteComponentProps {
  page: number;
  searchWord: string;
  order: string;
  movies?: any[] | undefined;
}

interface IRecipeState {
  movies: any[];
  isFetching: boolean;
  cantPages: number;
  actualPage: number;
  moviesFound: boolean;
}

class MoviesContainer extends Component<IRecipeProps, IRecipeState> {
  constructor(props: IRecipeProps) {
    super(props);
    this.state = {
      movies: [],
      isFetching: true,
      cantPages: 0,
      actualPage: 0,
      moviesFound: false,
    };
  }

  componentDidMount() {
    if (this.props.movies) {
      this.setState({
        movies: this.props.movies,
        isFetching: false,
        moviesFound: true,
      });
    } else {
      getMoviesWithWord(this.props.searchWord, this.props.page)
        .then((result) => {
          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(result.cant / 10); i++) {
            pageNumbers.push(i);
          }

          const showPages = pageNumbers.filter((num) => {
            return num - this.props.page > -4 && num - this.props.page < 4;
          });

          console.log("showPages: ", showPages);
          console.log("pageNumbers: ", pageNumbers);
          this.setState({
            movies: result.result,
            cantPages: Math.ceil(result.cant / 10),
            actualPage: Number(this.props.page),
            isFetching: false,
            moviesFound: true,
          });
          console.log("cantpaginas: ", this.state.cantPages);
        })
        .catch((error) => {
          this.setState({ isFetching: false, moviesFound: false });
          console.log("Erororo: ", error);
        });
    }
  }

  componentDidUpdate(prevProps: IRecipeProps, prevState: IRecipeState) {
    if (prevProps.searchWord !== this.props.searchWord) {
      getMoviesWithWord(this.props.searchWord, this.props.page)
        .then((result) => {
          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(result.cant / 10); i++) {
            pageNumbers.push(i);
          }
          this.sortMovies(result.result, "normal");
          this.setState({
            movies: result.result,
            cantPages: Math.ceil(result.cant / 10),
            actualPage: 1,
            isFetching: false,
            moviesFound: true,
          });
        })
        .catch((error) => {
          this.setState({ isFetching: false, moviesFound: false });
          console.log(error);
        });
    }
    if (prevProps.order !== this.props.order) {
      let arr: any[] = [];
      arr = this.state.movies;
      this.sortMovies(arr, this.props.order);
      this.setState({ movies: arr });
    }
  }

  sortMovies = (movies: Array<any>, order: string) => {
    switch (order) {
      case "alphabetic":
        movies.sort((a, b) => {
          if (a.Title <= b.Title) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "imdbRatingDesc":
        movies.sort((a, b) => {
          if (a.imdbRating >= b.imdbRating) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "imdbRatingAsc":
        movies.sort((a, b) => {
          if (a.imdbRating <= b.imdbRating) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "yearDesc":
        movies.sort((a, b) => {
          if (a.Year >= b.Year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "yearAsc":
        movies.sort((a, b) => {
          if (a.Year <= b.Year) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      default:
        break;
    }
  };

  handleViewDetails = (imdbID: string) => {
    this.props.history.push("/movie/" + imdbID);
  };

  handlePageChange = (page: number) => {
    this.setState({ isFetching: true });
    console.log("Handlendo el pagechange, con page:, ", page);
    this.props.history.push("/search/" + this.props.searchWord + "/" + page);
    getMoviesWithWord(this.props.searchWord, page)
      .then((result) => {
        this.setState({
          movies: result.result,
          isFetching: false,
          actualPage: page,
          moviesFound: true,
        });
      })
      .catch((error) => {
        this.setState({ isFetching: false, moviesFound: false });
        console.log(error);
      });
  };

  render() {
    return (
      <div className="movies-wrapper">
        <div className="posters-wrapper">
          {this.state.isFetching ? (
            <h1>Loading Movies</h1>
          ) : this.state.moviesFound ? (
            this.state.movies.map((movie) => {
              return (
                <Poster
                  onClick={this.handleViewDetails}
                  key={movie.imdbID}
                  movie={movie}
                  render={this.props.order}
                />
              );
            })
          ) : (
            <h1>No results found!</h1>
          )}
          {!this.state.moviesFound || this.state.isFetching ? null : (
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

interface IPaginationProps {
  actualPage: number;
  cantPages: number;
  handlePageChange(page: number): void;
}

function RenderPagination(props: IPaginationProps) {
  const [showPages, setshowPages] = useState<number[]>([]);
  const [initialEllipsis, setinitialEllipsis] = useState(false);
  const [finalEllipsis, setfinalEllipsis] = useState(false);

  const handlePageChange = (event: any) => {
    const page = Number(event.target.id);
    props.handlePageChange(page);
  };

  useEffect(() => {
    const pageNumbers = [];
    let showPages = [];
    for (let i = 1; i <= props.cantPages; i++) {
      pageNumbers.push(i);
    }

    showPages = pageNumbers.filter((num) => {
      return num - props.actualPage > -4 && num - props.actualPage < 4;
    });

    if (props.cantPages - props.actualPage > 3) {
      setfinalEllipsis(true);
    } else {
      setfinalEllipsis(false);
    }

    if (props.actualPage > 4) {
      setinitialEllipsis(true);
    } else {
      setinitialEllipsis(false);
    }

    console.log("Este es el slice", showPages);
    console.log("Esta es la pag seleccionada", props.actualPage);

    setshowPages(showPages);
  }, [props.actualPage, props.cantPages]);

  return (
    <React.Fragment>
      <Pagination
        style={{
          position: "absolute",
          bottom: "1px",
          marginTop: "10px",
          backgroundColor: "blue",
        }}
      >
        {initialEllipsis ? (
          <React.Fragment>
            {" "}
            <Pagination.Item
              key={1}
              id={"1"}
              active={props.actualPage === 1}
              onClick={handlePageChange}
            >
              {1}
            </Pagination.Item>{" "}
            <Pagination.Ellipsis disabled />{" "}
          </React.Fragment>
        ) : null}
        {showPages.map((num) => {
          if (Number.isInteger(num)) {
            return (
              <Pagination.Item
                key={num}
                id={num.toString()}
                active={props.actualPage === num}
                onClick={handlePageChange}
              >
                {num}
              </Pagination.Item>
            );
          } else {
            return <Pagination.Ellipsis key={num} disabled />;
          }
        })}
        {finalEllipsis ? (
          <React.Fragment>
            <Pagination.Ellipsis disabled />{" "}
            <Pagination.Item
              key={props.cantPages}
              id={props.cantPages.toString()}
              active={props.actualPage === props.cantPages}
              onClick={handlePageChange}
            >
              {props.cantPages}
            </Pagination.Item>{" "}
          </React.Fragment>
        ) : null}
      </Pagination>
    </React.Fragment>
  );
}

interface IPosterProps {
  onClick(imdbID: string): void;
  key: string;
  movie: any;
  render: string;
}

function Poster(props: IPosterProps) {
  const [hoverActivo, sethoverActivo] = useState(false);
  const [activeLeaveAnimation, setactiveLeaveAnimation] = useState(false);

  const handleEnter = () => {
    sethoverActivo(true);
    setactiveLeaveAnimation(true);
  };

  const handleLeave = () => {
    sethoverActivo(false);
  };

  useEffect(() => {
    sethoverActivo(false);
    setactiveLeaveAnimation(false);
  }, [props.render]);

  return (
    <div
      className="poster-container"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="image-container">
        <img
          className="poster-img"
          src={props.movie.Poster}
          alt={props.movie.Title}
        />
        {hoverActivo ? (
          <HoverPoster onClick={props.onClick} movie={props.movie} />
        ) : activeLeaveAnimation ? (
          <LeavePoster onClick={props.onClick} movie={props.movie} />
        ) : null}
      </div>
    </div>
  );
}

interface IPosterInfoProps {
  onClick(imdbID: string): void;
  movie: any;
}

function PosterInfo(props: IPosterInfoProps) {
  return (
    <ul className="list-of-details">
      <li className="text-center">
        <h4 className="font-weight-bold">{props.movie.Title}</h4>
      </li>
      <li className="justify-content-center pb-3">
        <button
          className="button-view-detail"
          onClick={() => props.onClick(props.movie.imdbID)}
        >
          View Details
        </button>
      </li>
      <li>
        <h5>Duration:</h5>
        {props.movie.Runtime ? <h6>{props.movie.Runtime}</h6> : <h6> N/A</h6>}
      </li>
      <li>
        <h5>Year:</h5>{" "}
        {props.movie.Year ? <h6>{props.movie.Year}</h6> : <h6> N/A</h6>}
      </li>
      <li>{props.movie.Plot ? <h5>{props.movie.Plot}</h5> : <h5>N/A</h5>}</li>
      <li>
        <h5>Genre:</h5>
        {props.movie.Genre ? <h6>{props.movie.Genre}</h6> : <h6>N/A</h6>}
      </li>
    </ul>
  );
}

interface ILeavePosterProps {
  onClick(imdbID: string): void;
  movie: any;
}

function LeavePoster(props: ILeavePosterProps) {
  return (
    <div className="container-fluid poster-leave">
      <PosterInfo onClick={props.onClick} movie={props.movie} />
    </div>
  );
}

interface IHoverPosterProps {
  onClick(imdbID: string): void;
  movie: any;
}

function HoverPoster(props: IHoverPosterProps) {
  return (
    <div className="container-fluid poster-hover">
      <PosterInfo onClick={props.onClick} movie={props.movie} />
    </div>
  );
}

export default withRouter(MoviesContainer);
