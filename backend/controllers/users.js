const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const BadRequest = require("../errors/BadRequest");
const BadAuth = require("../errors/BadAuth");
const NotFound = require("../errors/NotFound");
const BadUnique = require("../errors/BadUnique");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest(
          "Переданы некорректные данные в методы получения пользователя",
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Email или пароль могут быть пустыми",
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadUnique("Пользователь существует");
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .catch((err) => {
              if (err.name === "MongoError" && err.code === 11000) {
                throw new BadUnique(
                  "Пользователь с таким email уже существует",
                );
              }
            })
            .then((currentUser) => res.status(200).send({ currentUser: currentUser.toJSON() }))
            .catch((err) => {
              if (err.name === "ValidationError") {
                throw new BadRequest(
                  "Переданы некорректные данные в методы создания пользователя",
                );
              } else {
                next(err);
              }
            });
        });
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequest(
          "Переданы некорректные данные в методы обновления профиля",
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequest(
          "Переданы некорректные данные в методы обновления аватара",
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFound("Нет пользователя с таким id");
      } else {
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (error) {
            throw new BadRequest("Неверный запрос");
          }
          if (!isValid) {
            throw new BadAuth("Неправильный пароль");
          }
          if (isValid) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
              { expiresIn: "7d" },
            );
            res
              .cookie("jwt", token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              })
              .send({ message: "Вы авторизовались", token });
          }
        });
      }
    })
    .catch(() => {
      throw new BadAuth("Ошибка авторизации");
    })
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound("Нет пользователя с таким id");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest(
          "Переданы некорректные данные в методы получения пользователя",
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
