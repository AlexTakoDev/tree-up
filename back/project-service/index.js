const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require('dotenv').config();

const routes = require("./route/routes");
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db_URL = process.env.DB_URL;

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(db_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
});

app.use(routes);

app.listen(port, () => {
    console.log('Server run on port ' + port);
});