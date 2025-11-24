const db = require("../config/db");

module.exports = {
  createTeams: (name, description, orgId, callback) => {
    db.run(
      `INSERT INTO teams ( name, description, organisations_id) VALUES(?, ?, ?)`,
      [name, description, orgId],
      callback
    );
  },

  getTeams: (orgId, callback) => {
    db.all("SELECT * FROM teams WHERE organisations_id = ?", [orgId], callback);
  },

  updateTeamDetails: (
    name,
    description,
    organisations_id,
    teamId,
    callback
  ) => {
    const query = `UPDATE teams SET  name = ? , description = ?, organisations_id = ?  WHERE id = ?`;
    const params = [name, description, organisations_id, teamId];

    db.run(query, params, (err) => {
      callback(err, this);
    });
  },

  deleteItem: (id, callback) => {
    db.run(`DELETE FROM teams WHERE id = ? `, [id], callback);
  },
};
