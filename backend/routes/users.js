const router = require("express").Router();
const auth = require("../controllers/authenticateWithToken");
const {
  getUsers,
  addUser,
  loginUser,
  checkIfExist,
  validateUsername,
  validateEmail,
  addMovie,
  getMovies,
  deleteMovie,
} = require("../controllers/usersController");

/* router.route("/").get(auth, getUsers); */

router
  .route("/register")
  .post(validateEmail, validateUsername, checkIfExist, addUser);

router.route("/login").post(validateEmail, loginUser);

//Agrega una movie al usuario
router.route("/movies").post(addMovie);

//Devuelve todas las movies del usuario
router.route("/movies").get(getMovies);

//Borra una movie favorita del usuario
router.route("/movies").delete(deleteMovie);

module.exports = router;
