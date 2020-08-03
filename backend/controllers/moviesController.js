let User = require("../models/userModel");
let Movie = require("../models/movieModel");
const axios = require("axios");

async function getMoviesFromDatabaseWithTitle(title) {
  const regex = new RegExp(title, "i");
  try {
    const movies = await Movie.find({ title: regex });
    return movies;
  } catch (e) {
    console.log(e);
    return [];
  }
}

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
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.status(200).json({ movies });
    } catch (e) {
      res.status(404).json({ message: "No movies in DB", error: e });
    }
  },
  getAllMoviesWithTitle: async (req, res) => {
    const { title } = req.query;
    const moviesFromDB = await getMoviesFromDatabaseWithTitle(title);
    if (moviesFromDB.length > 0) {
      res.status(200).json({ movies: moviesFromDB });
    } else {
      console.log("No se encontraron movies en db: ");
      const movies = await getMoviesImdbID(title, 1);
      let arrOfMovies = movies.Search;
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
              res.status(200).json({ movies: addedMovies });
            } catch (e) {
              res
                .status(500)
                .json({ message: "Can't insert in database", error: e });
            }
          }
        );
      } else {
        console.log("No movies found");
        res.status(404).json({ message: "No movies found" });
      }
    }
  },
};
