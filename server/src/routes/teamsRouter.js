const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teamsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/teams", authMiddleware, teamsController.addTeams);

router.get("/teams", authMiddleware, teamsController.getTeamDetails);

router.patch("/teams", authMiddleware, teamsController.patchTeamDetails);

router.delete("/teams/:id", authMiddleware, teamsController.deleteTeam);

module.exports = router;
