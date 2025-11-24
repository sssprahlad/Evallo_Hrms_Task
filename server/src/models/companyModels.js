const db = require("../config/db");

module.exports = {
  findByEmail: (email, callback) => {
    db.get("SELECT * FROM organisations WHERE email = ?", [email], callback);
  },

  createUser: (company_name, admin_name, email, hashedPassword, callback) => {
    db.run(
      "INSERT INTO organisations (company_name, admin_name, email, password) VALUES(?, ?, ?, ?)",
      [company_name, admin_name, email, hashedPassword],
      callback
    );
  },

  findByUserLogin: (email, callback) => {
    db.get("SELECT * FROM organisations WHERE email = ?", [email], callback);
  },
};
