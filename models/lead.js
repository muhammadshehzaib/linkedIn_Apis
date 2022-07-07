const mongoose = require("mongoose");
const validator = require("validator");
const schema = new mongoose.Schema({
  profileUrl: {
    type: String,
    required: true,
    trim: true,
  },
});
const Leads = mongoose.model("Leads", schema);
module.exports = Leads;
