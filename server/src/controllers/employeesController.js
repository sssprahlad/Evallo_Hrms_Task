const Employee = require("../models/employeesModels");

exports.employees = (req, res) => {
  const { employeeName, email, position, department, phone, date, orgId } =
    req.body;
  console.log(req.body);

  if (
    !employeeName ||
    !email ||
    !position ||
    !department ||
    !phone ||
    !date ||
    !orgId
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    Employee.createEmployee(
      employeeName,
      email,
      position,
      department,
      phone,
      date,
      orgId,
      async (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Failed to add employee details", status: 500 });

        return res.json({
          message: "Employee details added successfully.",
          status: 200,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add employee details", status: 500 });
  }
};

exports.getEmployees = (req, res) => {
  Employee.getAllEmployees((err, employeeList) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Failed to get employees details." });

    return res.status(200).json({ status: 200, employees_list: employeeList });
  });
};

exports.patchEmployees = (req, res) => {
  const employeeId = req.query.employeeId;
  const {
    employeeName,
    email,
    position,
    department,
    phone,
    date,
    organisations_id,
  } = req.body;

  console.log(req.body);

  try {
    Employee.updateEmployeeDetails(
      employeeName,
      email,
      position,
      department,
      phone,
      date,
      organisations_id,
      employeeId,
      async (err) => {
        if (err)
          return res.status(500).json({
            message: "Failed to update employee details",
            status: 500,
          });

        return res.json({
          message: "Employee details updated successfully.",
          status: 200,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update employee details", status: 500 });
  }
};

exports.getOrgEmployees = (req, res) => {
  const orgId = req.query.orgId;
  console.log(orgId, "OrgId");
  Employee.orgEmployeesList(orgId, (err, employeeList) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Failed to get employees details." });
    return res.status(200).json({ status: 200, employees_list: employeeList });
  });
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  Employee.deleteItem(id, (err) => {
    if (err) return res.status(500).json({ status: 500, message: "DB error" });
    res
      .status(200)
      .json({ status: 200, message: "Employee deleted successfully" });
  });
};
