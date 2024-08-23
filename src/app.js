const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const v1ApiRouter = require("./routes");
const { authenticateToken } = require("./middlewares/authMiddleware");

const app = express();
app.use(authenticateToken);
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", v1ApiRouter);
app.use(errorHandler);

module.exports = app;
