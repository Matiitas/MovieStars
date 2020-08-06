import axios from "axios";

const getFavoriteMovies = () => {
  return axios.get("http://localhost:5000/api/v1/users/movies");
};

/* const getFavoriteMoviesWithDetailsForProfile = () => {
  return axios.get("http://localhost:5000/api/v1/users/profile/movies");
}; */

const addToFavorites = (movieID) => {
  return axios.post(
    "http://localhost:5000/api/v1/users/movies?movieID=" + movieID
  );
};

const deleteFromFavorites = (movieID) => {
  return axios.delete(
    "http://localhost:5000/api/v1/users/movies?movieID=" + movieID
  );
};

const getMoviesWithTitle = (title) => {
  return axios.get("http://localhost:5000/api/v1/movies/title?title=" + title);
};

const getMoviesForHome = (arr) => {
  const data = {
    arrayOfImdbID: arr,
  };
  return axios.post("http://localhost:5000/api/v1/movies/recommended", data);
};

const getMovieByImdbID = (imdbID) => {
  return axios.get(
    "http://localhost:5000/api/v1/movies/imdbID?imdbID=" + imdbID
  );
};

const getLoggedUserData = () => {
  return axios.get("http://localhost:5000/api/v1/users/me");
};

export {
  getFavoriteMovies,
  addToFavorites,
  deleteFromFavorites,
  getMoviesWithTitle,
  getMoviesForHome,
  getMovieByImdbID,
  getLoggedUserData,
};
