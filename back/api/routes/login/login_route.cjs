const express = require('express');
const router = express.Router();
const db = require('../../db.cjs');
const { ValidationError, ServerError } = require('../../../middleware/error_models.cjs');

router.post('/', (req, res, next) => {
    const { username, password } = req.body;

    console.log(username, password);

    if (!username) {
        throw new ValidationError("Username is required");
    }

    const firstQuery = 'SELECT employee_id, user_name, password, role, company_id FROM table_users_data WHERE user_name = ?';
    const secondQuery = 'SELECT * FROM table_employee_data WHERE id = ?';

    db.query(firstQuery, [username], (err, userResults) => {
        if (err) {
            console.error('Database query error:', err);
            return next(new ServerError('Database query error', err));
        }

        if (userResults.length === 0) {
            console.log('User does not exist');
            return res.status(200).json({ exists: false });
        }

        const user = userResults[0];
        const { employee_id: employeeId, password: storedPassword, role, company_id: companyId } = user;

        if (storedPassword !== password) {
            console.log('Invalid password');
            return res.status(200).json({ exists: true, valid: false });
        }

        // Valid user, proceed to fetch employee data
        db.query(secondQuery, [employeeId], (err, employeeResults) => {
            if (err) {
                console.error('Database query error:', err);
                return next(new ServerError('Database query error', err));
            }

            const employeeData = employeeResults.length > 0 ? employeeResults[0] : null;

            // Send response only after both queries are processed
            return res.status(200).json({
                exists: true,
                valid: true,
                role,
                companyId,
                employeeId,
                employeeData,
            });
        });
    });
});

module.exports = router;
