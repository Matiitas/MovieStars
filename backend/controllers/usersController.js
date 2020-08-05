let User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Movie = require("../models/movieModel");

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

  /* getUser: (req, res) => {
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
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }, */
  getUser: async (req, res) => {
    try {
      const result = await User.findById({ _id: req.userId }).populate(
        "movies"
      );
      const user = {
        movies: result.movies,
        username: result.username,
        email: result.email,
        profileImage: result.profileImage,
        name: result.name,
        city: result.city,
        country: result.country,
        birthDate: result.birthDate,
      };
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "No user found", error: e });
    }
  },
  updateUserImage: (req, res) => {
    User.findById({ _id: req.userId })
      .then((user) => {
        console.log("primer then", req.file);
        user.profileImage = req.file.filename;
        user
          .save()
          .then((response) => {
            console.log("segundo then");
            res.json({
              message: "Update succesful",
              newProfileImageName: req.file.filename,
            });
          })
          .catch((err) => {
            console.log("segundo catch");
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log("primer catch");
        res.status(404).json(err);
      });
  },

  updateUser: (req, res) => {
    console.log("Este es el req.body: ", req.body);
    User.findById({ _id: req.userId })
      .then((user) => {
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
  addMovie: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { $push: { movies: req.query.movieID } },
        { new: true, useFindAndModify: false }
      );
      const movie = await Movie.findByIdAndUpdate(
        req.query.movieID,
        { $push: { users: user._id } },
        { new: true, useFindAndModify: false }
      );
      res.status(200).json({
        message: "Added to favorites",
      });
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "User not found", error: e });
    }
  },

  //?myparam1=${abc_energyprogramid}
  //buscar por t = title o i = imdb ID, devuelve mas info, por s, mas resultados
  // getMovies : Devuelve un array de json obj
  /*   user.movies es [
          "IdDeLaMovie",
          "IdDeLaMovie2"
        ] */

  getFavoriteMovies: async (req, res) => {
    user = await User.findById({ _id: req.userId });
    if (user) {
      res.json({ movies: user.movies });
    } else {
      res.status(404).json("User not found");
    }
  },
  getMoviesDetails: async (req, res) => {},
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  deleteMovie: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          $pullAll: { movies: [req.query.movieID] },
        },
        { new: true, useFindAndModify: false }
      );
      const movie = await Movie.findByIdAndUpdate(
        req.query.movieID,
        {
          $pullAll: { users: [req.userId] },
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).json({ message: "Deleted from favorites" });
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .json({ message: "The operation could not be performed", error: e });
    }
  },
};
