const db = require('../config/db');

const createPrescription = (
    doctor_id,
    patient_id,
    medicine,
    dosage,
    notes,
    callback
) => {

    const sql = `
        INSERT INTO prescriptions
        (doctor_id, patient_id, medicine, dosage, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [doctor_id, patient_id, medicine, dosage, notes],
        callback
    );
};

const getDoctorPrescriptions = (doctor_id, callback) => {

    const sql = `
        SELECT * FROM prescriptions
        WHERE doctor_id = ?
    `;

    db.all(sql, [doctor_id], callback);
};

const getPatientPrescriptions = (patient_id, callback) => {

    const sql = `
        SELECT * FROM prescriptions
        WHERE patient_id = ?
    `;

    db.all(sql, [patient_id], callback);
};

const updatePrescription = (
    id,
    medicine,
    dosage,
    notes,
    callback
) => {

    const sql = `
        UPDATE prescriptions
        SET medicine = ?, dosage = ?, notes = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [medicine, dosage, notes, id],
        callback
    );
};

module.exports = {
    createPrescription,
    getDoctorPrescriptions,
    getPatientPrescriptions,
    updatePrescription
};