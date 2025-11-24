const db = require("../config/db");

exports.assignEmployeeToTeam = (team_id, employee_id, callback) => {
  const query = `INSERT INTO employee_teams (team_id, employee_id) VALUES(?, ?) `;
  db.run(query, [team_id, employee_id], (err) => {
    callback(err, this);
  });
};

exports.removeEmployeeFromTeam = (id, callback) => {
  const query = `DELETE FROM employee_teams WHERE id = ?`;
  db.run(query, [id], (err) => {
    callback(err, this);
  });
};

exports.getTeamEmployeesDetails = (callback) => {
  const query = `
    SELECT 
      et.id,
      et.team_id,
      et.employee_id,
      et.assigned_at,
      e.employeeName,
      e.email,
      e.position
    FROM employee_teams et
    JOIN employees e ON et.employee_id = e.id
   
    
    `;
  db.all(query, callback);
};
