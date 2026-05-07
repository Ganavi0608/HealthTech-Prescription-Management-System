const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/healthtech.db', (err) => {

    if (err) {
        console.log(err.message);
    } else {

        console.log('SQLite Connected');

        db.serialize(() => {

            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT CHECK(role IN ('doctor', 'patient')) NOT NULL
                )
            `, (err) => {

                if (err) {
                    console.log(err.message);
                } else {
                    console.log('Users Table Created');
                }
            });

            db.run(`
                CREATE TABLE IF NOT EXISTS prescriptions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    doctor_id INTEGER,
                    patient_id INTEGER,
                    medicine TEXT NOT NULL,
                    dosage TEXT NOT NULL,
                    notes TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

                    FOREIGN KEY (doctor_id) REFERENCES users(id),
                    FOREIGN KEY (patient_id) REFERENCES users(id)
                )
            `, (err) => {

                if (err) {
                    console.log(err.message);
                } else {
                    console.log('Prescriptions Table Created');
                }
            });

        });
    }
});

module.exports = db;