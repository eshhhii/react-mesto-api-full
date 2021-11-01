require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const handleError = require("./middlewares/handleError");
const {
  validationLogin,
  validationCreateUser,
} = require("./middlewares/validation");
const { NotFound } = require("./errors/NotFound");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  "http://eshhhii.nomoredomains.monster",
  "https://eshhhii.nomoredomains.monster",
  "http://localhost:3000",
  "https://localhost:3000",
];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.status(200).send();
  }

  return next();
});

app.use(helmet());

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post("/signin", validationLogin, login);
app.post("/signup", validationCreateUser, createUser);

app.use("/", auth, userRouter);
app.use("/", auth, cardRouter);
app.use(() => {
  throw new NotFound("Роутер не найден");
});
app.use(errorLogger);
app.use(errors());
app.use(handleError());

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
