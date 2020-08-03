const router = require("express").Router();
const { getAllMoviesWithTitle } = require("../controllers/moviesController");

//get all the movies in db
router.route("/").get(async (req, res) => {
  /* console.log("Esto es el req.body: ", req.body); */
  const movies = await Movie.find({});
  console.log("All movies: ", movies);
});

//get movie for id
router.route("/id").get(async (req, res) => {
  console.log("Esta es la req.query.imdbID: ", req.query.movieid);
});

//get all movies for title and add to db
router.route("/title").get(getAllMoviesWithTitle);

module.exports = router;
