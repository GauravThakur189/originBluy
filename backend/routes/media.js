
const express = require("express");
const router = express.Router();
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();

const { upload, s3 } = require("../config/s3"); 
const FileList = require("../models/fileList");
const authenticateToken = require("./auth"); 


// Route: Upload Media (Image/Video)

router.post("/media/upload", authenticateToken, upload.single("media"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    let fileType = "";
    if (file.mimetype.startsWith("image/")) {
      fileType = "image";
    } else if (file.mimetype.startsWith("video/")) {
      fileType = "video";
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    
    const newFile = new FileList({
      filename: file.originalname,
      url: file.location,    
      s3Key: file.key,       
      type: fileType,
      user: req.user.id,     
    });

    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Error in uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route: Get All Media for Logged-In User

router.get("/media", authenticateToken, async (req, res) => {
  try {
    
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    const mediaFiles = await FileList.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    const count = await FileList.countDocuments({ user: userId });
    res.status(200).json({
      mediaFiles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in fetching media files:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route: Delete a Media File

router.delete("/media/:id", authenticateToken, async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    
    const fileToDelete = await FileList.findOne({ _id: fileId, user: userId });
    if (!fileToDelete) {
      return res.status(404).json({ message: "File not found" });
    }

  
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileToDelete.s3Key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    
    await FileList.deleteOne({ _id: fileId });
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error in deleting file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
