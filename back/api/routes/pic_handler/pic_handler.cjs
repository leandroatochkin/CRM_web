require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const PROFILE_PIC_FOLDER =  process.env.PROFILE_PIC_FOLDER;


// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILE_PIC_FOLDER); // Directory to save files
  },
  filename: (req, file, cb) => {
    const userId = req.body.userId; // Multer will populate this
    if (!userId) {
      return cb(new Error('User ID is required to save the file.'));
    }
    cb(null, `${userId}-${file.originalname}`); // Append userId to the file name
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 2 * 256 * 256 }, // 130kb file size limit
  fileFilter,
});

// POST route for file upload
router.post(
  '/',
  upload.single('image'), // Use Multer to handle 'image' file input
  (req, res) => {
    try {
      const file = req.file;
      const userId = req.body.userId; // Access userId from form-data

      if (!file) {
        return res.status(400).json({ message: 'Please upload a file!' });
      }

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required!' });
      }

      res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: `../../../files/employee_pics/${file.filename}`, // Path to access the file
      });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
  }
);

module.exports = router;
