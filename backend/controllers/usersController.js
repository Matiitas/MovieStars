let User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const omdbURL = "http://www.omdbapi.com/?apikey=";

module.exports = {
  addUser: (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    newUser = new User({ username, email, password });
    newUser
      .save()
      .then(() => res.json({ message: "User added" }))
      .catch((err) => res.status(400).json({ error: err }));
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
        res.json({ error: "Password incorrect" });
      }
    } else {
      res.json({ error: "Email dont exist" });
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  checkIfExist: async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ error: "Email taken" });
    } else {
      user = await User.findOne({ username: req.body.username });
      if (user) {
        res.json({ error: "Username taken" });
      } else {
        next();
      }
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  validateUsername: (req, res, next) => {
    if (req.body.username.length < 4) {
      res.json({ error: "Username short" });
    } else {
      next();
    }
  },
  validateEmail: (req, res, next) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validate = re.test(req.body.email);
    if (!validate) {
      res.json({ error: "Invalid email" });
    } else {
      next();
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  getUser: (req, res) => {
    User.findById(req.userId)
      .then((response) => {
        const user = {
          movies: response.movies,
          username: response.username,
          email: response.email,
          profileImage: response.profileImage,
          name: response.name,
          city: response.city,
          country: response.country,
          birthDate: response.birthDate,
        };
        res.json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  updateUser: (req, res) => {
    console.log("Esta es req.file: ", req.file);
    console.log("Este es el req.body: ", req.body);
    User.findById({ _id: req.userId })
      .then((user) => {
        user.profileImage = req.file.filename;
        user.name = req.body.name;
        user.birthDate = req.body.birthDate;
        user.country = req.body.country;
        user.city = req.body.city;
        user
          .save()
          .then(res.json({ message: "Update succesful" }))
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  //si la movie ya esta en los favoritos del usuario no se agrega
  addMovie: (req, res) => {
    User.updateOne(
      { _id: req.userId },
      { $addToSet: { movies: req.query.movieID } }
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

  getFavoriteMoviesId: async (req, res) => {
    user = await User.findById({ _id: req.userId });
    if (user) {
      res.json({ movies: user.movies });
    } else {
      res.status(404).json("User not found");
    }
  },
  getMoviesDetails: async (req, res) => {
    user = await User.findById({ _id: req.userId });
    if (user) {
      var promises = [];
      var result = [];
      user.movies.forEach((movieId) => {
        promises.push(
          axios.get(
            omdbURL + process.env.OMDB_KEY + "&i=" + movieId + "&plot=full"
          )
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
      { $pullAll: { movies: [req.query.movieID] } }
    )
      .then((result) => {
        console.log("Este es el resultado si lo encontro: ", result);
        res.json({ message: "Removed" });
      })
      .catch((err) => {
        console.log("Error", err);
        res.status(404).json(err);
      });
  },
};
