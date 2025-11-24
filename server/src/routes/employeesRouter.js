const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/employee", authMiddleware, employeesController.employees);

router.get("/employee", authMiddleware, employeesController.getEmployees);

router.get(
  "/employee-by-org",
  authMiddleware,
  employeesController.getOrgEmployees
);

router.patch("/employee", authMiddleware, employeesController.patchEmployees);

router.delete(
  "/employee/:id",
  authMiddleware,
  employeesController.deleteEmployee
);

module.exports = router;
