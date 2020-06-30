import React, { useState, useEffect } from "react";
import "../assets/styles/moviesContainer.css";

function MoviesContainer(props) {
  const [needRender, setneedRender] = useState(false);
  /* const renderMovies = () => {
    props.movies.map((movie) => {
      return <Poster img={movie.poster} />;
    });
  }; */

  useEffect(() => {
    if (props.movies !== undefined) {
      console.log("Use effect", props.movies.length);
      setneedRender(true);
    } else {
      console.log("Use effect part else");
    }
  }, [props.movies]);

  return (
    <div className="movies-wrapper">
      <div className="posters-wrapper">
        {console.log("estas son las props en movies container: ", props.movies)}
        {needRender ? (
          props.movies.map((movie) => {
            return (
              <Poster
                imdbID={movie.imdbID}
                key={movie.imdbID}
                img={movie.Poster}
                title={movie.Title}
              />
            );
          })
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    </div>
  );
}

function Poster(props) {
  const [hoverActivo, sethoverActivo] = useState(false);
  const [activeLeaveAnimation, setactiveLeaveAnimation] = useState(false);

  const handleEnter = () => {
    sethoverActivo(true);
    setactiveLeaveAnimation(true);
    console.log("Mouse enter: ", props.imdbID, "Hover activo: ", hoverActivo);
  };

  const handleLeave = () => {
    sethoverActivo(false);
    console.log("Mouse leave: ", props.imdbID, "Hover activo: ", hoverActivo);
  };

  return (
    <div
      className="poster-container"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="image-container">
        <img className="poster-img" src={props.img} alt={props.title} />
        {hoverActivo ? (
          <HoverPoster title={props.title} />
        ) : activeLeaveAnimation ? (
          <LeavePoster title={props.title} />
        ) : null}
      </div>
      {/* {hoverActivo ? props.children : null} */}
    </div>
  );
}

function LeavePoster(props) {
  return (
    <div className="poster-leave">
      <h1>{props.title}</h1>
    </div>
  );
}

function HoverPoster(props) {
  return (
    <div className="poster-hover">
      <h1>{props.title}</h1>
    </div>
  );
}

export default MoviesContainer;
