import React from "react";

const RenderListMoreInfo = (props) => {
  return (
    <ul className="movie-details-list">
      <li>
        <h5>Plot:</h5>
        <h6> {props.movie.plot ? props.movie.plot : "N/A"}</h6>
      </li>
      <li>
        <h5>Writer:</h5>

        <h6> {props.movie.writer ? props.movie.writer : "N/A"}</h6>
      </li>
      <li>
        <h5>Production:</h5>

        <h6> {props.movie.production ? props.movie.production : "N/A"}</h6>
      </li>
      <li>
        <h5>Language:</h5>

        <h6> {props.movie.language ? props.movie.language : "N/A"}</h6>
      </li>
      <li>
        <h5>Rated:</h5>
        <h6> {props.movie.rated ? props.movie.rated : "N/A"}</h6>
      </li>
      <li>
        <h5>Awards:</h5>
        <h6> {props.movie.awards ? props.movie.awards : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        <h6> {props.movie.imdbRating ? props.movie.imdbRating : "N/A"}</h6>
      </li>
      <li>
        <h5>Rotten Tomatoes:</h5>
        <h6>
          {" "}
          {props.movie.ratings[1] ? props.movie.ratings[1].Value : "N/A"}
        </h6>
      </li>
      <li>
        <h5>Metacritic:</h5>
        <h6>
          {" "}
          {props.movie.ratings[2] ? props.movie.ratings[2].Value : "N/A"}
        </h6>
      </li>
    </ul>
  );
};

export default RenderListMoreInfo;
