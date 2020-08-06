const User = require("../models/userModel");
const Movie = require("../models/movieModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: (req, res) => {
    console.log(req.body);
    if (req.body.password.length < 8) {
      res.status(400).json({ message: "Password too short" });
    } else {
      const username = req.body.username;
      const email = req.body.email;
      const password = bcrypt.hashSync(req.body.password, saltRounds);
      newUser = new User({ username, email, password });
      newUser
        .save()
        .then(() => res.json({ message: "User added" }))
        .catch((err) => {
          console.log("Se cacho este error: ", err);
          res
            .status(500)
            .json({ message: "The operation could not be performed" });
        });
    }
  },
  loginUser: async (req, res) => {
    try {
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
          res.status(200).json({ message: "Login correct", token });
        } else {
          res.status(500).json({ message: "Password incorrect" });
        }
      } else {
        res.status(404).json({ message: "Email dont exist" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "The operation could not be performed" });
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  checkIfExist: async (req, res, next) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: "Email taken" });
      } else {
        user = await User.findOne({ username: req.body.username });
        if (user) {
          res.status(400).json({ message: "Username taken" });
        } else {
          next();
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "The operation could not be performed" });
    }
  },
  validateUsername: (req, res, next) => {
    if (req.body.username.length < 4) {
      res.status(400).json({ message: "Username short" });
    } else {
      next();
    }
  },
  validateEmail: (req, res, next) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validate = re.test(req.body.email);
    if (!validate) {
      res.status(400).json({ message: "Invalid email" });
    } else {
      next();
    }
  },
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
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
      res.status(404).json({ message: "No user found" });
    }
  },
  updateUserImage: (req, res) => {
    User.findById({ _id: req.userId })
      .then((user) => {
        user.profileImage = req.file.filename;
        user
          .save()
          .then((response) => {
            res.status(200).json({
              message: "Update succesful",
              newProfileImageName: req.file.filename,
            });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(404)
              .json({ message: "The operation could not be performed" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "User not found" });
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
            console.log(err);
            res
              .status(500)
              .json({ message: "The operation could not be performed" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "User not found" });
      });
  },
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
      res.status(404).json({ message: "User not found" });
    }
  },
  getFavoriteMovies: async (req, res) => {
    user = await User.findById({ _id: req.userId });
    if (user) {
      res.status(200).json({ movies: user.movies });
    } else {
      res.status(404).json("User not found");
    }
  },
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
      res.status(404).json({ message: "The operation could not be performed" });
    }
  },
};
