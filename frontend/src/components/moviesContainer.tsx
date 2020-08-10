import React, { useState, useEffect, Component } from "react";
import "../assets/styles/moviesContainer.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

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
  /* render: string; */
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

  /* useEffect(() => {
    sethoverActivo(false);
    setactiveLeaveAnimation(false);
  }, [props.render]); */

  return (
    <div
      className="poster-container"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="image-container">
        <img
          className="poster-img"
          src={props.movie.poster}
          alt={props.movie.title}
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
        <h4 className="font-weight-bold">{props.movie.title}</h4>
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
        {props.movie.runtime ? <h6>{props.movie.runtime}</h6> : <h6> N/A</h6>}
      </li>
      <li>
        <h5>Year:</h5>{" "}
        {props.movie.year ? <h6>{props.movie.year}</h6> : <h6> N/A</h6>}
      </li>
      <li>{props.movie.plot ? <h5>{props.movie.plot}</h5> : <h5>N/A</h5>}</li>
      <li>
        <h5>Genre:</h5>
        {props.movie.genre ? <h6>{props.movie.genre}</h6> : <h6>N/A</h6>}
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
