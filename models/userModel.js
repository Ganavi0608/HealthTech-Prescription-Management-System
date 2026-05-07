const db = require('../config/db');

const createUser = (name, email, password, role, callback) => {
    const sql = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [name, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], callback);
};

module.exports = {
    createUser,
    findUserByEmail
};