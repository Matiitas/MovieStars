const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    actors: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
    },
    year: {
      type: String,
      trim: true,
    },
    runtime: {
      type: String,
    },
    genre: {
      type: String,
      trim: true,
    },
    director: {
      type: String,
    },
    country: {
      type: String,
    },
    imdbID: {
      type: String,
      unique: true,
    },
    imdbRating: {
      type: String,
    },
    plot: {
      type: String,
      trim: true,
    },
    writer: {
      type: String,
    },
    production: {
      type: String,
    },
    language: {
      type: String,
    },
    rated: {
      type: String,
    },
    awards: {
      type: String,
    },
    poster: {
      type: String,
    },
    ratings: { type: Array, default: [] },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema); //Movie, nombre de la tabla
module.exports = Movie;
