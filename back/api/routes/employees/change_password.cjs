const express = require('express');
const router = express.Router();
const db = require('../../db.cjs');
const { ValidationError, ServerError } = require('../../../middleware/error_models.cjs');
const bcrypt = require('bcrypt'); // For secure password handling

router.post('/', async (req, res, next) => {
  const { oldPassword, newPassword, employeeId } = req.body;

  // Input validation
  if (!oldPassword || !newPassword || !employeeId) {
    return next(new ValidationError('Old password, new password, and employee ID are required'));
  }

  try {
    const changePasswordCheck = 'SELECT password FROM table_users_data WHERE employee_id = ?';
    const changePasswordUpdate = 'UPDATE table_users_data SET password = ? WHERE employee_id = ?';

    // Check the current password in the database
    db.query(changePasswordCheck, [employeeId], async (err, results) => {
      if (err) {
        return next(new ServerError('Database error while checking password'));
      }

      if (results.length === 0) {
        return next(new ValidationError('Employee ID not found'));
      }

      const storedHash = results[0].password;

      // Compare old password with stored hash
      const isMatch = await bcrypt.compare(oldPassword, storedHash);

      if (!isMatch) {
        return next(new ValidationError('Old password is incorrect'));
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in the database
      db.query(changePasswordUpdate, [hashedNewPassword, employeeId], (err) => {
        if (err) {
          return next(new ServerError('Error updating password'));
        }
        return res.status(200).json({ message: 'Password changed successfully' });
      });
    });
  } catch (error) {
    return next(new ServerError('Server error: ' + error.message));
  }
});

module.exports = router;
