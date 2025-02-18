
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET, 
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    contentType: function (req, file, cb) {
      
      cb(null, file.mimetype);
    },
  }),
});

module.exports = { upload, s3 };