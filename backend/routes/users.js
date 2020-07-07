const router = require("express").Router();
const auth = require("../controllers/authenticateWithToken");
const {
  getUser,
  addUser,
  loginUser,
  checkIfExist,
  validateUsername,
  validateEmail,
  addMovie,
  getMoviesDetails,
  deleteMovie,
  getFavoriteMoviesId,
} = require("../controllers/usersController");

/* router.route("/").get(auth, getUsers); */

router
  .route("/register")
  .post(validateEmail, validateUsername, checkIfExist, addUser);

router.route("/login").post(validateEmail, loginUser);

router.route("/me").get(auth, getUser);

//Agrega una movie al usuario
router.route("/movies").post(auth, addMovie);

//Devuelve todas las movies del usuario
router.route("/movies").get(auth, getFavoriteMoviesId);

//Devuelve los detalles de todas las movies favoritas del user
router.route("/profile/movies").get(auth, getMoviesDetails);

//Borra una movie favorita del usuario
router.route("/movies").delete(auth, deleteMovie);

module.exports = router;
