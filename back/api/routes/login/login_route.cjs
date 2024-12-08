const express = require('express');
const router = express.Router();
const db = require('../../db.cjs');
const { ValidationError, ServerError } = require('../../../middleware/error_models.cjs');
const bcrypt = require('bcrypt');

// Convert db.query into a Promise-based function
const queryAsync = (query, params) =>
  new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(new ValidationError("Username is required"));
  }

  try {
    const firstQuery = 'SELECT employee_id, user_name, password, role, company_id FROM table_users_data WHERE user_name = ?';
    const secondQuery = 'SELECT * FROM table_employee_data WHERE id = ?';

    // Perform the first database query
    const userResults = await queryAsync(firstQuery, [username]);

    if (userResults.length === 0) {
      console.log('User does not exist');
      return res.status(200).json({ exists: false });
    }

    const user = userResults[0];
    const { employee_id: employeeId, password: storedPassword, role, company_id: companyId } = user;

    // Check the password using bcrypt
    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      return res.status(200).json({ exists: true, valid: false });
    }

    // Perform the second database query
    const employeeResults = await queryAsync(secondQuery, [employeeId]);
    const employeeData = employeeResults.length > 0 ? employeeResults[0] : null;

    // Send the response
    return res.status(200).json({
      exists: true,
      valid: true,
      role,
      companyId,
      employeeId,
      employeeData,
      storedPassword
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return next(new ServerError('Error processing request', error));
  }
});

module.exports = router;
