import axios from "axios";

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

/* const getMoviesByArrayOfID = (arr, plot = "short") => {
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
}; */

export {
  /* getMoviesByArrayOfID, */
  getMovieWithExactTitle,
  getMoviesFromArrayOfTitles,
};
