const User = require("../models/User"); // Model User
const keys = require("../config/keys"); // Secret key
const Tree = require("../models/Tree"); // Model Tree
const fs = require("fs");

module.exports.location = async function (req, res) {
  console.log("Server location");
  try {
    const ltx = Number(req.query.ltx);
    const lty = Number(req.query.lty);
    const rbx = Number(req.query.rbx);
    const rby = Number(req.query.rby);

    // console.log(49.234851, "X", 28.458206, "Y");
    // console.log(ltx, "X", lty, "Y", rbx, "X", rby, "Y");

    const candidate = await Tree.find({
      coordinatesX: { $lt: ltx, $gt: rbx },
      coordinatesY: { $gt: lty, $lt: rby },
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
    const treeType = Number(req.body.treeType);
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
      treeType,
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
  try {
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.delete = async function (req, res) {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};
