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
  deleteMovie,
  getFavoriteMovies,
  updateUser,
  updateUserImage,
} = require("../controllers/usersController");
const multer = require("multer");

// Para subir imagenes
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb("Not a valid image", false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
  fileFilter: fileFilter,
});

router
  .route("/register")
  .post(validateEmail, validateUsername, checkIfExist, addUser);

router.route("/login").post(validateEmail, loginUser);

//Devuelvo datos del usuario logueado, mas favorite movies populate
router.route("/profile").get(auth, getUser);

//Agrega una movie al usuario
router.route("/movies").post(auth, addMovie);

//Devuelve el _id de todas las movies del usuario
router.route("/movies").get(auth, getFavoriteMovies);

/* //Devuelve los detalles de todas las movies favoritas del user
router.route("/profile/movies").get(auth, getMoviesDetails); */

router.route("/profile/edit").post(auth, updateUser);

router
  .route("/profile/edit-image")
  .post(auth, upload.single("profileImage"), updateUserImage);

//Borra una movie favorita del usuario
router.route("/movies").delete(auth, deleteMovie);

module.exports = router;
