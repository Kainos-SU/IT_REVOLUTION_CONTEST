const bcrypt = require("bcryptjs"); // Hesh password
const jwt = require("jsonwebtoken"); // new jwt
const jwt_decode = require("jwt-decode"); // jwt decode
const User = require("../models/User"); // Model User
const Token = require("../models/Token"); // Model Token
const keys = require("../config/keys"); // Secret key

module.exports.login = async function (req, res) {
  console.log("Server login");
  try {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (passwordResult) {
        const tokenDB = await new Token({
          _id_user: candidate._id,
        });
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
            tokenId: tokenDB._id,
          },
          keys.jwt,
          { expiresIn: "168h" }
        );

        await tokenDB.save();
        res.status(200).json({
          token: `Bearer ${token}`,
          _id: candidate._id,
        });
      } else {
        res.status(401).json({
          message: "Введено не вірно пароль або пошта.",
        });
      }
    } else {
      res.status(404).json({
        message: "Користувача з такою поштою не знайдено.",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.register = async function (req, res) {
  console.log("Server register");
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      message: "Цей емейл уже занятий, виберіть другий.",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      name: req.body.name,
      role: 0,
    });
    try {
      await user.save();
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
    }
  }
};

module.exports.logout = async function (req, res) {
  try {
    console.log("Server logout");
    const candidateDelToken = req.body.token;
    const token = await Token.find({ _id_user: req.body._id }); // Списко токенів користувача який хоче вийти з кабінету.

    const tokenDelete = jwt_decode(candidateDelToken); // Декодіровка jwt токена

    const tokenDeleteID = tokenDelete.tokenId; // ID токена сесії користувача який хоче вийти

    await Token.findByIdAndRemove({ _id: tokenDeleteID });
    res.status(200).json({ message: "Успішно" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};
