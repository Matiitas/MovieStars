import React, { useState } from "react";

interface IPosterProps {
  onClick(imdbID: string): void;
  key: string;
  movie: any;
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

export default Poster;
