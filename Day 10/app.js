const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");


const app = express();

app.use(helmet());

app.use(cors({origin: process.env.FRONTEND_URL || "*"}));

app.use(morgan("dev"));

app.use(logger);

app.use(express.json());

const sensorsRouter = require("./routes/sensors");
app.use("/api/sensors", sensorsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.url} not found` });
});

// error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


module.exports = app;