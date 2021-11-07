require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const options = {
  origin: [
    "http://eshhhii.nomoredomains.monster",
    "https://eshhhii.nomoredomains.monster",
    "http://api.eshhhii.nomoredomains.monster",
    "https://api.eshhhii.nomoredomains.monster",
    "http://localhost:3000",
    "https://localhost:3000",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization", "Accept"],
  credentials: true,
};

app.use("*", cors(options));

app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post("/signup", validationCreateUser, createUser);
app.post("/signin", validationLogin, login);

app.use("/", auth, userRouter);
app.use("/", auth, cardRouter);
app.use(() => {
  throw new NotFound("Роутер не найден");
});
app.use(errorLogger);
app.use(errors());
app.use(handleError);

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
