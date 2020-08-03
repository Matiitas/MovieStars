let User = require("../models/userModel");
let Movie = require("../models/movieModel");
const axios = require("axios");

async function getMoviesImdbID(searchWord, page) {
  const movies = await axios({
    method: "get",
    url:
      "http://www.omdbapi.com/?apikey=7ef8a59d&s=" +
      searchWord +
      "&type=movie" +
      "&page=" +
      page,
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
  });
  return movies.data;
}

function getMovieByID(id, plot = "full") {
  return axios({
    method: "get",
    url: "http://www.omdbapi.com/?apikey=7ef8a59d&i=" + id + "&plot=" + plot,
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
  });
}

module.exports = {
  getAllMoviesWithTitle: async (req, res) => {
    const { title } = req.query;
    const movies = await getMoviesImdbID(title, 1);
    let arrOfMovies = movies.Search;
    console.log("Res del getAllMovies: ", movies);
    if (movies.Response === "True") {
      const promises = [];
      const cantPages = Math.ceil(movies.totalResults / 10);
      const result = [];
      for (let i = 2; i <= cantPages; i++) {
        let tempMovies = await getMoviesImdbID(title, i);
        if (tempMovies.Response === "True") {
          arrOfMovies = arrOfMovies.concat(tempMovies.Search);
        }
      }
      arrOfMovies.forEach((movie) => {
        promises.push(getMovieByID(movie.imdbID, "short"));
      });
      Promise.all(promises.map((p) => p.catch(() => undefined))).then(
        async (movies) => {
          movies.forEach((movie) => {
            if (movie && movie.status === 200) {
              console.log("movie.data: ", movie.data);
              let {
                Actors,
                Title,
                Year,
                Runtime,
                Writer,
                Director,
                Production,
                Genre,
                Plot,
                Language,
                Country,
                Awards,
                Ratings,
                Poster,
                imdbID,
              } = movie.data;
              newMovie = new Movie({
                actors: Actors,
                title: Title,
                year: Year,
                runtime: Runtime,
                writer: Writer,
                director: Director,
                production: Production,
                genre: Genre,
                plot: Plot,
                language: Language,
                country: Country,
                awards: Awards,
                ratings: Ratings,
                poster: Poster,
                imdbID: imdbID,
              });
              result.push(newMovie);
            }
          });
          try {
            const addedMovies = await Movie.insertMany(result, {
              ordered: false,
            });
            console.log("Esto es el aux: ", addedMovies);
          } catch (e) {
            console.log("Esto es el error: ", e);
          }
        }
      );
    } else {
      console.log("No movies found");
    }
  },
};
