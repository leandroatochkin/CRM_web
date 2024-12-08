require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../../db.cjs')
const { ValidationError, ServerError } = require('../../../middleware/error_models.cjs');

const PROFILE_PIC_FOLDER = process.env.PROFILE_PIC_FOLDER;

const updatePicQuery = `UPDATE  table_employee_data SET  profilePic_path = ? WHERE id = ?`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILE_PIC_FOLDER); // Directory to save files
  },
  filename: (req, file, cb) => {
    // Temporary placeholder filename
    cb(null, `temp-${Date.now()}-${file.originalname}.jpg`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ValidationError('Only image files are allowed!'), false);
  }
};

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 2 * 256 * 256 }, // 130kb file size limit
  fileFilter,
});

// POST route for file upload
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.body.userId;

    if (!file) {
      return next(new ValidationError('No file uploaded!'));
    }

    if (!userId) {
      // Remove the temporary file if userId is missing
      fs.unlinkSync(file.path);
      return next(new ValidationError('Missing userId in request body!'));
    }

    // Get the original file extension
    const originalExtension = path.extname(file.originalname); // e.g., ".jpg", ".png"
    const newFilename = `${userId}-${Date.now()}.jpg`;
    const newFilePath = path.join(PROFILE_PIC_FOLDER, newFilename);

    // Rename the file with the correct extension
    fs.renameSync(file.path, newFilePath);

    res.status(200).json({
      message: 'File uploaded successfully!',
      filePath: `../../../files/employee_pics/${newFilename}`, // Path to access the file
    });

    db.query(updatePicQuery,[newFilename, userId], (err, results) => {
        if (err) {
            console.log(err);
            return next(new ServerError('Error updating profile picture!'))
            }
            });

  } catch (error) {
    return next(new ServerError('Error updating profile picture!'))
  } 

});

module.exports = router;
