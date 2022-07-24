const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treeSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  treeType: {
    type: String,
    required: true,
  },
  addres: {
    type: String,
    required: true,
  },
  coordinatesX: {
    type: Number,
    required: true,
  },
  coordinatesY: {
    type: Number,
    required: true,
  },
  leafShape: {
    type: String,
    required: true,
  },
  // registerNumber: {
  //   type: String,
  //   required: true,
  // },
  // id MondoDB
  crownRadius: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  periodicityWatering: {
    type: Number,
    // required: true,
  },
  lastWatering: {
    type: String,
    // required: true,
  },
  listVaccination: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("tree", treeSchema);
