const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const treeSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  treeSpecies: {
    type: String,
    required: true,
  },
  addres: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true,
    ltx: {
      type: Number,
      required: true,
    },
    lty: {
      type: Number,
      required: true,
    },
    rbx: {
      type: Number,
      required: true,
    },
    rby: {
      type: Number,
      required: true,
    },
  },
  leafShape: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: String,
    required: true,
  },
  trunkDiameter: {
    type: Number,
    required: true,
  },
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
  frequencyWatering: {
    type: Number,
    required: true,
  },
  lastWatering: {
    type: Number,
    required: true,
  },
  listVaccination: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("tree", treeSchema);
