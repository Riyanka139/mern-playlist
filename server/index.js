const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const api = require("./routes/index");
require("dotenv").config();

const app = express();

//middleware
//enable cors
app.use(cors());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

// connect with mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((err) => console.error(err));

// Middleware to ensure Spotify Access Token
// app.use(async (req, res, next) => {
//   if (!spotifyAccessToken) {
//     await getSpotifyAccessToken();
//   }
//   next();
// });

//routing
app.use("/api", api);

server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
