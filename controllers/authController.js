const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

exports.register = (req, res) => {

    const { name, email, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {

        userModel.createUser(
            name,
            email,
            hashedPassword,
            role,
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: 'User Registered'
                });
            }
        );
    });
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    userModel.findUserByEmail(email, (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            res.json({
                token,
                role: user.role
            });
        });
    });
};