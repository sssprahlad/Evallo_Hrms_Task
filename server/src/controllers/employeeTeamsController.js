const EmployeeTeams = require("../models/employeeTeamsModel");
const { employees } = require("./employeesController");

exports.assignEmployee = (req, res) => {
  const { team_id, employee_id } = req.body;

  if (!team_id || !employee_id)
    return res.status(400).json({ message: "All fields are required." });

  try {
    EmployeeTeams.assignEmployeeToTeam(team_id, employee_id, async (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Failed to add emp to teams details", status: 500 });

      return res.json({
        message: "Emp to Team details added successfully.",
        status: 200,
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add emp to team details", status: 500 });
  }
};

exports.deleteAssignment = (req, res) => {
  const { id } = req.params;

  EmployeeTeams.removeEmployeeFromTeam(id, (err) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, message: "failed to remove employee" });
    res
      .status(200)
      .json({ status: 200, message: "Employee remove from team successfully" });
  });
};

exports.getTeamEmployees = (req, res) => {
  //   const team_id = req.query.team_id || req.query.teamId;

  //   if (!team_id) return res.status(400).json({ message: "Team id is required" });

  EmployeeTeams.getTeamEmployeesDetails((err, rows) => {
    if (err)
      return res.status(500).json({ message: "Failed to fetch employees." });

    return res.status(200).json({ status: 200, employees: rows });
  });
};
