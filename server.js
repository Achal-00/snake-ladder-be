require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/gameData");

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(gameRoutes);

mongoose
  .connect(process.env.DB_KEY)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
