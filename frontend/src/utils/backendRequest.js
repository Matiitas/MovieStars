import axios from "axios";

const getFavoriteMovies = () => {
  return axios.get("http://localhost:5000/api/v1/users/movies");
};

const addToFavorites = (imdbID) => {
  return axios.post(
    "http://localhost:5000/api/v1/users/movies?movieID=" + imdbID
  );
};

const deleteFromFavorites = (imdbID) => {
  return axios.delete(
    "http://localhost:5000/api/v1/users/movies?movieID=" + imdbID
  );
};

export { getFavoriteMovies, addToFavorites, deleteFromFavorites };
