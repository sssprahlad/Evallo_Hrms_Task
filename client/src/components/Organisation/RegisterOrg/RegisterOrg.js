import "./RegisterOrg.css";

import React from "react";
import { LuBuilding2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const RegisterOrg = () => {
  const navigate = useNavigate();
  return (
    <div className="register-container">
      <form className="form-container">
        <div className="org-container">
          <div className="bg-icon">
            <LuBuilding2 style={{ color: "#ffffff", fontSize: "1.2rem" }} />
          </div>
          <h2>HRMS Portal</h2>
          <p>Manage your organization efficiently</p>
        </div>
        <div className="form-controll">
          <label htmlFor="companyName">Company name</label>
          <input
            id="companyName"
            type="text"
            placeholder="Enter company name"
          />
        </div>

        <div className="form-controll">
          <label htmlFor="adminName">Admin name</label>
          <input id="adminName" type="text" placeholder="Enter admin name" />
        </div>
        <div className="form-controll">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter company email" />
        </div>
        <div className="form-controll">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter company password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <span className="span-text">
          Already have an account?{" "}
          <a className="sign-in" onClick={() => navigate("/login")}>
            Sign In
          </a>{" "}
        </span>
      </form>
    </div>
  );
};

export default RegisterOrg;
