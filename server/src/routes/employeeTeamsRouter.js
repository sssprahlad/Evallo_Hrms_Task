const express = require("express");
const router = express.Router();
const employeeTeamsController = require("../controllers/employeeTeamsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/assign", authMiddleware, employeeTeamsController.assignEmployee);

router.delete(
  "/assign/:id",
  authMiddleware,
  employeeTeamsController.deleteAssignment
);

router.get(
  "/team-employees",
  authMiddleware,
  employeeTeamsController.getTeamEmployees
);

module.exports = router;
