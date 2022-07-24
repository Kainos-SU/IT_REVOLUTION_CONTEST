const User = require("../models/User"); // Model User
const keys = require("../config/keys"); // Secret key
const Tree = require("../models/Tree"); // Model Tree
const jwt_decode = require("jwt-decode");
const fs = require("fs");

module.exports.location = async function (req, res) {
  console.log("Server location");
  try {
    const ltx = Number(req.query.ltx);
    const lty = Number(req.query.lty);
    const rbx = Number(req.query.rbx);
    const rby = Number(req.query.rby);

    console.log(49.234851, "X", 28.458206, "Y");
    console.log(ltx, "X", lty, "Y", rbx, "X", rby, "Y");

    // $eq (дорівнює)
    // $ne (не дорівнює)
    // $gt (більше за)
    // $lt (меньше за)
    // $gte (більше або рівне)
    // $lte (меньше або рівне)

    const candidateDB = await Tree.find({
      coordinatesX: { $lt: ltx, $gt: rbx }, // localhost
      coordinatesY: { $gt: lty, $lt: rby }, // localhost
    });
    let candidate = [];

    candidateDB.forEach((item) => {
      candidate.push({
        _id: item._id,
        crownRadius: item.crownRadius,
        coordinatesX: item.coordinatesX,
        coordinatesY: item.coordinatesY,
      });
    });

    res.status(200).json(candidate);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.infotree = async function (req, res) {
  console.log("Server infotree");
  try {
    const treeID = req.params.paramID;

    const tree = await Tree.findById(treeID); // Пошук в бд дерева по id

    res.status(200).json(tree);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.create = async function (req, res) {
  console.log("Server create");
  try {
    // const treeType = req.body.treeType;
    const coordinates = req.body.coordinates.split(",");
    const coordinatesX = Number(coordinates[0]);
    const coordinatesY = Number(coordinates[1]); // Координати дерева на карті

    const age = Number(req.body.age);

    const trunkDiameter = Number(req.body.trunkDiameter);
    const crownRadius = Number(req.body.crownRadius);
    const periodicityWatering = Number(req.body.periodicityWatering);
    const lastWatering = new Date(0);

    const newTree = new Tree({
      imgSrc: req.file.path,
      treeType: req.body.treeType,
      addres: req.body.addres,
      coordinatesX,
      coordinatesY,
      leafShape: req.body.leafShape,
      // registerNumber: req.body.registerNumber, // id Mongo
      trunkDiameter,
      crownRadius,
      age,
      state: req.body.state,
      // periodicityWatering, //
      // lastWatering:, //
      listVaccination: req.body.listVaccination ? req.body.listVaccination : "",
    });

    newTree.save();
    res.status(201).json({ message: "Успішно збережено." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.updating = async function (req, res) {
  console.log("Server updating");
  try {
    console.log(req.body);
    const user = await decodeJWT(req.headers.authorization);
    if (user) {
      if (user.role >= 1) {
        let updated = {}; // Змінення які ми вносимо.
        updated = req.body; // Змінення які прийшли з серверу.

        if (req.file) {
          updated.imgSrc = req.file.path;

          // Видалення старого фото
          const treeUp = await Tree.findById(req.params.treeUpdatingId);

          const deleteImgSrc = treeUp.imgSrc; // Фото яке потрібно видалити

          if (deleteImgSrc !== "") {
            await deleteImg(deleteImgSrc);
          } // Видалення старго фото якщо воно було.
        } // При умові що є файл для оновлення

        const tree = await Tree.findOneAndUpdate(
          { _id: req.params.treeUpdatingId },
          { $set: updated },
          { new: true }
        );

        res.status(200).json({ message: "Змінення успішно внесені." });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.delete = async function (req, res) {
  console.log("Server delete");
  try {
    const userDecodeToken = jwt_decode(req.headers.authorization);

    const user = await User.findById(userDecodeToken.userId);
    console.log(req.params.treeDeleteId);

    if (user) {
      if (user.role >= 2) {
        const tree = await Tree.findById(req.params.treeDeleteId);
        console.log(tree);
        await Tree.findByIdAndRemove({ _id: req.params.treeDeleteId });
        res.status(200).json({ message: "Видалено успішно" });
      } else if (user.role <= 1) {
        res.status(403).json({
          message: "У вас не достатньо прав для видалення інформації.",
        });
      }
    } else {
      res.status(404).json({
        message: "Для виконання цієї дії потрібно бути авторизованим.",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

async function decodeJWT(token) {
  const userDecodeToken = jwt_decode(token);
  const user = await User.findById(userDecodeToken.userId);
  return user;
}

async function deleteImg(linkImg) {
  fs.unlinkSync(linkImg);
  console.log(`Delet file ${linkImg}`);
}
