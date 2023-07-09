const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPVerificationSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const OTPVerification = mongoose.model('OTPVerification', OTPVerificationSchema);

module.exports = OTPVerification;
