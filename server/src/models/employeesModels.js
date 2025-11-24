const db = require("../config/db");

module.exports = {
  createEmployee: (
    employeeName,
    email,
    position,
    department,
    phone,
    date,
    orgId,
    callback
  ) => {
    db.run(
      `INSERT INTO employees (employeeName, email, position, department, phone, date, organisations_id) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [employeeName, email, position, department, phone, date, orgId],
      callback
    );

    // db.run(
    //   `INSERT INTO activity_logs (employeeName, email, position, department, phone, date, organisations_id) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    //   [employeeName, email, position, department, phone, date, orgId],
    //   callback
    // );
  },

  getAllEmployees: (callback) => {
    db.all("SELECT * FROM employees", callback);
  },

  orgEmployeesList: (orgId, callback) => {
    db.all(
      "SELECT * FROM employees WHERE organisations_id = ?",
      [orgId],
      callback
    );
  },

  updateEmployeeDetails: (
    employeeName,
    email,
    position,
    department,
    phone,
    date,
    organisations_id,
    employeeId,
    callback
  ) => {
    const query = `UPDATE employees SET employeeName = ?, email = ? , position = ?, department = ?, phone = ?, date = ?, organisations_id = ? WHERE id = ?`;
    const params = [
      employeeName,
      email,
      position,
      department,
      phone,
      date,
      organisations_id,
      employeeId,
    ];

    db.run(query, params, (err) => {
      callback(err, this);
    });
  },

  deleteItem: (id, callback) => {
    db.run(`DELETE FROM employees WHERE id = ? `, [id], callback);
  },
};
