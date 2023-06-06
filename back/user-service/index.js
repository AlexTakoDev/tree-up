const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const testroute = require('./route/testRoute');
const userRoute = require('./route/userRoute');
const route = require("./route/testRoute");
const mongoose = require("mongoose");
require("dotenv").config();


const port = process.env.SERVER_PORT;

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     const { name = "user" } = req.query;
//     res.send(`Hello ${name}!`);
//   });

const db_URL = process.env.DB_URL;

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
});
app.use("/", testroute);
app.use("/api", userRoute);
// app.use("/", route);
//app.use("/api/", userRoutes);

app.listen(port, () => {
  console.log("serveur run on port " + port);
});
