import React, { useState } from "react";
import "./MainComponent.css";
import { IoMenuSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuActivity } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { TbBrandTeams } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Employees from "../Pages/Employees/Employees";
import Teams from "../Pages/Teams/Teams";
import Logs from "../Pages/Logs/Logs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmployeeDetails,
  setTeamEmployees,
  setTeamDetails,
} from "../../redux/reducer/services";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";

const MainComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const token = localStorage.getItem("token");
  const adminName = localStorage.getItem("adminName") || "";
  const orgName = localStorage.getItem("orgName") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchEmployees, fetchTeams, fetchTeamEmployees } =
    useContext(UserContext);

  console.log(token, "token");

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
    fetchTeamEmployees();
  }, []);

  const navList = [
    {
      id: 1,
      icon: RxDashboard,
      label: "Dashboard",
      view: "dashboard",
      to: "/",
    },
    {
      id: 2,
      icon: TbUsers,
      label: "Employees",
      view: "employees",
      to: "/employees",
    },
    { id: 3, icon: TbBrandTeams, label: "Teams", view: "teams", to: "/teams" },
    { id: 4, icon: FiActivity, label: "Logs", view: "logs", to: "/logs" },
    { id: 5, icon: MdLogout, label: "Logout", view: "logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("orgName");
    localStorage.removeItem("adminName");
    dispatch(setEmployeeDetails([]));
    dispatch(setTeamDetails([]));
    dispatch(setTeamEmployees([]));

    navigate("/login");
  };

  const handleActiveTab = (active) => {
    switch (active) {
      case "dashboard":
        setCurrentView(active);
        fetchEmployees();
        fetchTeams();
        fetchTeamEmployees();
        break;
      case "employees":
        setCurrentView(active);
        break;
      case "teams":
        setCurrentView(active);
        break;
      case "logs":
        setCurrentView(active);
        break;
      default:
        setCurrentView("dashboard");
        break;
    }
  };

  return (
    <div className="layout-container">
      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-close"}`}
      >
        <div className="sidebar-header">
          {sidebarOpen && <h3>HRMS Pro</h3>}
          <button
            className={sidebarOpen ? "toggle-btn" : "toggle-btn wdt"}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <IoIosCloseCircleOutline /> : <IoMenuSharp />}
          </button>
        </div>
        <nav className="nav">
          {navList?.map((eachTab) => {
            const Icon = eachTab.icon;
            return (
              <div key={eachTab.id} className="tab-list">
                {eachTab.view !== "logout" ? (
                  <button
                    className={`nav-item ${
                      eachTab.view === currentView ? "nav-active" : ""
                    }`}
                    // onClick={() => setCurrentView(eachTab.view)}
                    onClick={() => handleActiveTab(eachTab.view)}
                  >
                    {" "}
                    <Icon className="icon" />
                    {sidebarOpen && eachTab.label}
                  </button>
                ) : (
                  <div className="user-section">
                    <div className="user-info">
                      <div className="avatar">
                        {adminName[0]?.toUpperCase()}
                      </div>
                      <div
                        className={
                          sidebarOpen
                            ? "admin-container"
                            : "admin-container-none"
                        }
                      >
                        <h3 className="user-name">{adminName}</h3>
                        <p className="user-org">{orgName}</p>
                      </div>
                    </div>
                    <button
                      className="logout-btn nav-item"
                      onClick={handleLogout}
                    >
                      {" "}
                      <Icon className="icon" />
                      {sidebarOpen && eachTab.label}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div className={`main ${sidebarOpen ? "main-open" : "main-closed"}`}>
        <div className="content">
          {currentView === "dashboard" && <Dashboard />}
          {currentView === "employees" && <Employees />}
          {currentView === "teams" && <Teams />}
          {currentView === "logs" && <Logs />}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
