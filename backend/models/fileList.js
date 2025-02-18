const mongoose = require("mongoose");

const fileListSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  s3Key: { 
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  important:{
        type:Boolean,
        default:false,
    },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("fileList", fileListSchema);
