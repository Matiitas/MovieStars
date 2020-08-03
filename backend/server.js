const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/movies", moviesRoute);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
