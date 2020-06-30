import axios from "axios";

const getMoviesImdbID = async (searchWord) => {
  const movies = await axios({
    method: "get",
    url: "http://www.omdbapi.com/?apikey=7ef8a59d&s=" + searchWord,
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
  });
  return movies.data;
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
        promises.push(
          axios({
            method: "get",
            url: "http://www.omdbapi.com/?apikey=7ef8a59d&i=" + movie.imdbID,
            transformRequest: [
              (data, headers) => {
                delete headers.common.Authorization;
                return data;
              },
            ],
          })
        );
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

/* const getMoviesWithWord = async (searchWord) => {
  const movies = await getMoviesImdbID(searchWord);
  if (movies.Response === "True") {
    const promises = [];
    const result = [];
    movies.Search.forEach((movie) => {
      promises.push(
        axios({
          method: "get",
          url: "http://www.omdbapi.com/?apikey=7ef8a59d&i=" + movie.imdbID,
          transformRequest: [
            (data, headers) => {
              delete headers.common.Authorization;
              return data;
            },
          ],
        })
      );
    });
    return promises;
  } else {
    return undefined;
  }
}; */

export { getMoviesWithWord };
