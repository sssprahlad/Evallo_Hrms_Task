const bcrypt = require("bcrypt");
const Admin = require("../models/companyModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = (req, res) => {
  const { companyName, adminName, email, password } = req.body;

  if (!companyName || !adminName || !email || !password) {
    return res.status(400).json({ message: "All Fields are Requiresd" });
  }

  Admin.findByEmail(email, async (err, existingUser) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      Admin.createUser(companyName, adminName, email, hashedPassword, (err) => {
        if (err)
          return res.status(500).json({ message: "Failed to register user" });

        res.json({ message: "Register Successful" });
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to register user" });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    Admin.findByUserLogin(email, async (err, existingUser) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (!existingUser)
        return res.status(401).json({ message: "Invalid email or password" });

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword)
        return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log(existingUser, "exist");

      res.status(200).json({
        token,
        message: `${existingUser.company_name} Admin Login Successful`,
        status: 200,
        organisation_name: existingUser.company_name,
        org_id: existingUser.id,
        admin_name: existingUser.admin_name,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login user", status: 500 });
  }
};
