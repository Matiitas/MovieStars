import React, { Component } from "react";
import Navbar from "./navbar";
import "../assets/styles/details.css";
import { getMoviesByID } from "../utils/omdbRequest";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      isFetching: true,
    };
  }

  componentDidMount() {
    const { imdbID } = this.props.match.params;
    getMoviesByID(imdbID)
      .then((res) => {
        console.log("Esta es la res", res);
        this.setState({ movie: res.data, isFetching: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.state.isFetching ? (
          <h1>Loading</h1>
        ) : (
          <div className="global-wrapper">
            <div className="first-row">
              <div className="wrapper-second">
                <div className="poster-container">
                  <div className="image-container">
                    <img
                      className="poster-img"
                      src={this.state.movie.Poster}
                      alt={this.state.movie.Title}
                    />
                  </div>
                </div>
              </div>
              <div className="wrapper-second">
                <div className="resumen-box">
                  <h1>ASKDPASKDPKASPDASDKA</h1>
                </div>
              </div>
            </div>
            <div className="second-row">
              <div className="wrapper-second"></div>
              <div className="wrapper-second"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetail;
