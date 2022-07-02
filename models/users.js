const mongoose = require("mongoose");
const validator = require("validator");
const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("First name cannot be empty");
      }
    },
  },
  middleName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Middle name cannot be empty");
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Last name cannot be empty");
      }
    },
  },
  title: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Title cannot be empty");
      }
    },
  },
  userId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("User cannot be empty");
      }
      //  else if (!validator.equals(value)) {
      //     throw new Error("UserId is not correct");
      //   }
    },
  },
  userPassword: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
      } else if (validator.isEmpty(value)) {
        throw new Error("userPassword cannot be empty");
      }
    },
  },
  linkedInEmail: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      } else if (validator.isEmpty(value)) {
        throw new Error("Email cannot be empty");
      }
    },
  },
  linkedInPassword: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
      } else if (validator.isEmpty(value)) {
        throw new Error("LinkedIn password cannot be empty");
      }
    },
  },
  linkedAuthCode: {
    type: String,
    // required: true,
    trim: true,
  },
});
const User = mongoose.model("Users", schema);

module.exports = User;
