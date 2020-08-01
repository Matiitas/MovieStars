import axios from "axios";

const getMoviesImdbID = async (searchWord, page) => {
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
};

/* const getMoviesImdbID = (searchWord, page) => {
  return axios({
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
}; */

const getMovieWithExactTitle = (title, plot = "short") => {
  return axios({
    method: "get",
    url: "http://www.omdbapi.com/?apikey=7ef8a59d&t=" + title + "&plot=" + plot,
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
  });
};

const getMoviesFromArrayOfTitles = (arr, plot = "short") => {
  return new Promise((resolve, reject) => {
    if (arr === undefined || arr.length === 0) {
      reject("Error: Empty Array");
      return;
    }
    const promises = [];
    const result = [];
    arr.forEach((title) => {
      promises.push(getMovieWithExactTitle(title));
    });
    Promise.all(promises)
      .then((response) => {
        response.forEach((movie) => {
          result.push(movie.data);
        });
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMoviesWithWord = (searchWord, page) => {
  return new Promise(async (resolve, reject) => {
    if (searchWord === "" || searchWord === undefined) {
      reject("Error: Void string");
      return;
    }
    const movies = await getMoviesImdbID(searchWord, page);
    const cant = movies.totalResults;
    console.log("Total paginas del results es: ", Math.ceil(cant / 48));
    console.log("OMDB RESPONSE: ", movies.Response);
    if (movies.Response === "True") {
      const promises = [];
      const result = [];
      movies.Search.forEach((movie) => {
        promises.push(getMovieByID(movie.imdbID, "short"));
      });
      Promise.all(promises)
        .then((movies) => {
          movies.forEach((movie) => {
            if (movie.status === 200) {
              result.push(movie.data);
            }
          });
          resolve({ result: result, cant: cant });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      reject("Error: Movies not found");
    }
  });
};

const getMoviesByArrayOfID = (arr, plot = "short") => {
  return new Promise(async (resolve, reject) => {
    if (arr === undefined || arr.length === 0) {
      reject("Error: Empty Array");
      return;
    }
    const promises = [];
    const result = [];
    arr.forEach((id) => {
      promises.push(getMovieByID(id, plot));
    });
    Promise.all(promises)
      .then((movies) => {
        movies.forEach((movie) => {
          if (movie.status === 200) {
            result.push(movie.data);
          }
        });

        resolve(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getMovieByID = (id, plot = "full") => {
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
};

/* const getMovieByID = async (id, plot = "full") => {
  try {
    const movie = await axios({
      method: "get",
      url: "http://www.omdbapi.com/?apikey=7ef8a59d&i=" + id + "&plot=" + plot,
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
    return movie.data;
  } catch (e) {
    console.log(e);
  }
}; */

const getAllMoviesWithWord = (word) => {
  return new Promise(async (resolve, reject) => {
    if (word === "" || word === undefined) {
      reject("Error: Void string");
      return;
    }
    const movies = await getMoviesImdbID(word, 1);
    let arrOfMovies = movies.Search;
    console.log("Res del getAllMovies: ", movies);
    const cantPages = Math.ceil(movies.totalResults / 10);
    /* if (movies.data.Response === "True") {
      const promises = [];
      const result = [];
      for (let i = 2; i <= cantPages; i++) {
        let tempMovies = await getMoviesImdbID(word, i);
        if (tempMovies.data.Response === "True") {
          arrOfMovies = arrOfMovies.concat(tempMovies.data.Search);
        }
      }
      console.log("El total de movies despues del for es: ", arrOfMovies);
      arrOfMovies.forEach((movie) => {
        promises.push(getMovieByID(movie.imdbID, "short"));
      });
      Promise.all(promises.map((p) => p.catch(() => undefined))).then(
        (movies) => {
          movies.forEach((movie) => {
            if (movie && movie.status === 200) {
              result.push(movie.data);
            }
          });
          resolve({ result: result, cant: cantPages });
        }
      );
    } else {
      reject("Error: Movies not found");
    } */
  });
};

export {
  getMoviesWithWord,
  getMovieByID,
  getMoviesByArrayOfID,
  getMovieWithExactTitle,
  getMoviesFromArrayOfTitles,
  getAllMoviesWithWord,
};
