const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
require('dotenv').config();

const routes = require("./route/likeRoute");
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",routes);

app.listen(port, () => {
    console.log('Server run on port ' + port);
});