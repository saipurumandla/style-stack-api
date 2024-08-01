const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);

app.use(errorHandler);

module.exports = app;
