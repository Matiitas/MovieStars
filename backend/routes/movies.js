const router = require("express").Router();
const {
  getAllMoviesWithTitle,
  getAllMovies,
} = require("../controllers/moviesController");

//get all the movies in db
router.route("/").get(getAllMovies);

//get movie for id
router.route("/id").get(async (req, res) => {
  console.log("Esta es la req.query.movieid: ", req.query.movieid);
});

//get all movies for title and add to db
router.route("/title").get(getAllMoviesWithTitle);

module.exports = router;
