let User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const omdbURL = "http://www.omdbapi.com/?apikey=";

module.exports = {
  getUsers: (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  addUser: (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    newUser = new User({ username, email, password });
    newUser
      .save()
      .then(() => res.json({ message: "User added" }))
      .catch((err) => res.status(400).json("Error: " + err));
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  loginUser: async (req, res) => {
    console.log(req.body);
    user = await User.findOne({ email: req.body.email });
    if (user) {
      valido = bcrypt.compareSync(req.body.password, user.password);
      if (valido) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
          },
          process.env.SECRET_JWT
        );
        res.json({ message: "Login correct", token });
      } else {
        res.json({ message: "Password incorrect" });
      }
    } else {
      res.json({ message: "Email dont exist" });
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  checkIfExist: async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ message: "Email taken" });
    } else {
      user = await User.findOne({ username: req.body.username });
      if (user) {
        res.json({ message: "Username taken" });
      } else {
        next();
      }
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  validateUsername: (req, res, next) => {
    if (req.body.username.length < 4) {
      res.json({ message: "Username short" });
    } else {
      next();
    }
  },
  validateEmail: (req, res, next) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validate = re.test(req.body.email);
    if (!validate) {
      res.json({ message: "Invalid email" });
    } else {
      next();
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  //si la movie ya esta en los favoritos del usuario no se agrega
  addMovie: (req, res) => {
    User.updateOne(
      { _id: req.userId },
      { $addToSet: { movies: req.query.movieId } }
    )
      .then((result) => {
        console.log("Se agrego la movie", result);
        res.json("Movie add");
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(404).json("User not found");
      });
  },

  //?myparam1=${abc_energyprogramid}
  //buscar por t = title o i = imdb ID, devuelve mas info, por s, mas resultados
  // getMovies : Devuelve un array de json obj
  /*   user.movies es [
          "IdDeLaMovie",
          "IdDeLaMovie2"
        ] */
  getMovies: async (req, res) => {
    user = await User.findById({ _id: req.body.id });
    if (user) {
      var promises = [];
      var result = [];
      user.movies.forEach((movieId) => {
        promises.push(
          axios.get(omdbURL + process.env.OMDB_KEY + "&i=" + movieId)
        );
      });
      Promise.all(promises)
        .then((movies) => {
          movies.forEach((movie) => {
            console.log("Movie encontrada: ", movie.data.Title);
            if (movie.data.Response === "True") {
              result.push(movie.data);
            }
          });
          res.json({ movies: result });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      res.status(404).json("User not found");
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  deleteMovie: (req, res) => {
    User.updateOne(
      { _id: req.userId },
      { $pullAll: { movies: [req.query.movieId] } }
    )
      .then((result) => {
        console.log("Este es el resultado si lo encontro: ", result);
        res.json(result);
      })
      .catch((err) => {
        console.log("Error", err);
        res.status(404).json(err);
      });
  },
};
