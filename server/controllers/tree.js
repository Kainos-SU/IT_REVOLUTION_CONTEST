const User = require("../models/User"); // Model User
const keys = require("../config/keys"); // Secret key
const Tree = require("../models/Tree"); // Model Tree
const fs = require("fs");

module.exports.location = async function (req, res) {
  console.log("Server location");
  console.log(req.query);
  try {
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.infotree = async function (req, res) {
  try {
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.create = async function (req, res) {
  console.log("Server create");
  console.log(req.file);
  console.log(req.body);
  try {
    const newTree = new Tree({
      imgSrc: "",
      treeSpecies: req.body.treeSpecies, //
      addres: req.body.addres, //
      coordinates: req.body.coordinates, //
      leafShape: req.body.leafShape, //
      registerNumber: req.body.registerNumber, //
      trunkDiameter: req.body.trunkDiameter, //
      crownRadius: req.body.crownRadius, //
      age: req.body.age, //
      state: req.body.state, //
      frequencyWatering: req.body.frequencyWatering, //
      lastWatering: req.body.lastWatering, //
      listVaccination: req.body.listVaccination, //
    });
    console.log(newTree);
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
