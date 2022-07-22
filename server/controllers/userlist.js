const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");

module.exports.getByUserList = async function (req, res) {
  try {
    console.log("Сервер getByUserList");

    const limitUser = req.query.limit_user ? req.query.limit_user : 5; // Скільки користувачів на сторінку
    const page = req.query.page ? req.query.page : 0; // Сторінка яку нада відобразити

    let currentPage = page; // Нинішня сторінка

    const countUser = await User.countDocuments({}).exec(); // Максимальна кількість сторінок
    const maxPage = Math.ceil(countUser / limitUser); // Округлення сторінок в більшу сторону. 3.02 >> 4

    if (currentPage > maxPage) {
      return res.status(423).json({ message: "Не корректний запит" });
    }

    const oldUserList = await User.find()
      .limit(limitUser)
      .skip(limitUser * page);

    const userList = oldUserList.map((element) => {
      return {
        name: element.name,
        email: element.email,
        _id: element._id,
        admin: element.admin,
        __v: element.__v,
      };
    });

    if (currentPage === 0) {
      currentPage = 1;
    }

    res.status(200).json({ userList, currentPage, maxPage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.getByUserId = async function (req, res) {
  try {
    console.log("Сервер getByUserId");

    const candidateUser = await User.findById(req.params.id);

    let user = {
      _id: candidateUser._id,
      email: candidateUser.email,
      name: candidateUser.name,
      admin: candidateUser.admin,
      __v: candidateUser.__v,
    };

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.userDelete = async function (req, res) {
  try {
    console.log("Сервер delete");

    // req.params.id // Користувача якого мають видалити.
    // req.body // Користувач який хоче видалити іншого користувача. "АДМІН"

    const adminUser = await User.findById(req.body._id); // Користувач який хоче видалити іншого користувача.

    const countLoginDeleteUser = await Token.find({ _id_user: req.params.id });

    const passwordResult = bcrypt.compareSync(
      req.body.password,
      adminUser.password
    ); // Чи правильний пароль у адміна

    if (passwordResult === true && adminUser.admin === true) {
      if (req.body._id !== req.params.id) {
        await User.remove({ _id: req.params.id }); // Delete user in DB // Користувач якого буде видалено.
        for (let idx = 0; idx <= countLoginDeleteUser.length; idx++) {
          await Token.findOneAndDelete({
            _id_user: req.params.id,
          });
        }
        res.status(200).json({ message: "Користувача успішно видалено" });
      } else if (req.body._id === req.params.id) {
        res.status(423).json({
          message: "Ви не можете видалити самі себе.",
        });
      }
    } else {
      res.status(423).json({
        message:
          "Користувача не видалено. Введено не вірно пароль, або недостатньо прав для цього.",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};
