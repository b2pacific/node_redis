const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  isJobGuaranteeProgram: {
    type: Boolean,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  otherDetails: {
    type: Schema.Types.Mixed,
  },
  overview: {
    type: Schema.Types.Mixed,
  },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
