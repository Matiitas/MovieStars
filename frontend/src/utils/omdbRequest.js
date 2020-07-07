import axios from "axios";

const getMoviesImdbID = async (searchWord) => {
  const movies = await axios({
    method: "get",
    url:
      "http://www.omdbapi.com/?apikey=7ef8a59d&s=" + searchWord + "&type=movie",
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
  });
  return movies.data;
};

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

const getMoviesWithWord = (searchWord) => {
  return new Promise(async (resolve, reject) => {
    if (searchWord === "" || searchWord === undefined) {
      reject("Error: Void string");
      return;
    }
    const movies = await getMoviesImdbID(searchWord);
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
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      resolve(undefined);
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

export {
  getMoviesWithWord,
  getMovieByID,
  getMoviesByArrayOfID,
  getMovieWithExactTitle,
  getMoviesFromArrayOfTitles,
};
