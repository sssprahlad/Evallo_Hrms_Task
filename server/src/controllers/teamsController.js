const Teams = require("../models/temasModels");

exports.addTeams = (req, res) => {
  const { name, description, orgId } = req.body;
  console.log(req.body);

  if (!name || !description || !orgId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    Teams.createTeams(name, description, orgId, async (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Failed to add teams details", status: 500 });

      return res.json({
        message: "Team details added successfully.",
        status: 200,
      });
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add team details", status: 500 });
  }
};

exports.getTeamDetails = (req, res) => {
  const orgId = req.query.orgId;
  console.log(orgId, "OrgId");
  Teams.getTeams(orgId, (err, teamList) => {
    if (err)
      return res.status(500).json({ message: "Failed to get teams details." });
    return res.status(200).json({
      status: 200,
      team_list: teamList,
      message: "fetch team details successfully.",
    });
  });
};

exports.patchTeamDetails = (req, res) => {
  const teamId = req.query.teamId;
  const { name, description, organisations_id } = req.body;

  console.log(req.body);

  try {
    Teams.updateTeamDetails(
      name,
      description,
      organisations_id,
      teamId,
      async (err) => {
        if (err)
          return res.status(500).json({
            message: "Failed to update team details",
            status: 500,
          });

        return res.json({
          message: "team details updated successfully.",
          status: 200,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update team details", status: 500 });
  }
};

exports.deleteTeam = (req, res) => {
  const { id } = req.params;

  Teams.deleteItem(id, (err) => {
    if (err) return res.status(500).json({ status: 500, message: "DB error" });
    res.status(200).json({ status: 200, message: "Team deleted successfully" });
  });
};
