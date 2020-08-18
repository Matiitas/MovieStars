import React from "react";

const RenderListResumen = (props) => {
  return (
    <ul className="movie-details-list">
      <li className="justify-content-center">
        <h3 className="font-weight-bold">{props.movie.title}</h3>
      </li>
      <li>
        <h5>Year:</h5>
        <h6> {props.movie.year ? props.movie.year : "N/A"}</h6>
      </li>
      <li>
        <h5>Duration:</h5>

        <h6> {props.movie.runtime ? props.movie.runtime : "N/A"}</h6>
      </li>
      <li>
        <h5>Genre:</h5>

        <h6> {props.movie.genre ? props.movie.genre : "N/A"}</h6>
      </li>
      <li>
        <h5>Director:</h5>

        <h6> {props.movie.director ? props.movie.director : "N/A"}</h6>
      </li>
      <li>
        <h5>Actors:</h5>
        <h6> {props.movie.actors ? props.movie.actors : "N/A"}</h6>
      </li>
      <li>
        <h5>Country:</h5>

        <h6> {props.movie.country ? props.movie.country : "N/A"}</h6>
      </li>
      <li>
        <h5>IMDB:</h5>
        {props.movie.imdbID ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.imdb.com/title/" + props.movie.imdbID}
          >
            <h5>{props.movie.imdbID}</h5>
          </a>
        ) : (
          "N/A"
        )}
      </li>
    </ul>
  );
};
export default RenderListResumen;
