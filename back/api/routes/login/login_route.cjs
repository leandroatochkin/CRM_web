const express = require('express');
const router = express.Router();
const db = require('../../db.cjs');
const {ValidationError, ServerError} = require('../../../middleware/error_models.cjs')

router.post('/', (req, res, next) => {

    const { username, password } = req.body;

    console.log(username, password)
    if (!username) {

        throw  new ValidationError("username is required");

    }
    
    db.query(
        'SELECT  employee_id, user_name, password, role, company_id, employee_id  FROM  table_users_data WHERE user_name = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error('Database query error:', err);

                return next(new ServerError('Database query error', err))  

            }

            if (results.length === 0) {
                console.log('User does not exist');
                return res.status(200).json({ exists: false });
            } 

            console.log(results[0])

            const userId = results[0].employee_id;
            const storedPassword = results[0].password;
            const role = results[0].role; 
            const companyId = results[0].company_id;
            const employeeId = results[0].employee_id;

            if (storedPassword !== password) {
                console.log('Invalid password');
                return res.status(200).json({ exists: true, userId, valid: false });
            }

            return res.status(200).json({ exists: true, valid: true, role, companyId, employeeId });
        }
    );
});

module.exports = router;
