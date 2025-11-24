import "./Dashboard.css";

import React from "react";
import { TbUsers } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import { TbBrandTeams } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { employeesDetails, teamDetails } = useSelector(
    (state) => state.services
  );

  return (
    <div className="main-common-container">
      <h1>Dashboard</h1>
      <div className="employees-container container">
        <h3>Total Employees</h3>
        <div className="horizontal-container">
          <h2>{employeesDetails?.length}</h2>
          <TbUsers className="icon-size" />
        </div>
      </div>

      <div className="active-container container">
        <h3>Active Teams</h3>
        <div className="horizontal-container">
          <h2>{teamDetails?.length}</h2>
          <TbBrandTeams className="icon-size" />
        </div>
      </div>

      <div className="system-container container">
        <h3>System Logs</h3>
        <div className="horizontal-container">
          <h2>{teamDetails?.length}</h2>
          <FiActivity className="icon-size" />
        </div>
      </div>

      <div className="recent-activity-container">
        <h3>Recent Activity</h3>
        <div className="recent-active-item-container">
          <FiActivity style={{ color: "#2563eb" }} />
          <div className="item-cont">
            <p className="user-login">User logged in</p>
            <p className="user-login-date">2024-11-20</p>
          </div>
        </div>
      </div>

      <div className="recent-activity-container">
        <h3>Team Overview</h3>
        <div className="recent-active-item-container">
          <FiActivity style={{ color: "#2563eb" }} />
          <div className="item-cont">
            <p className="user-login">User logged in</p>
            <p className="user-login-date">2024-11-20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
