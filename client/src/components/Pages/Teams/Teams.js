import React, { useState, useEffect } from "react";
import "./Teams.css";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import {
  ADD_GET_TEAM_DETAILS,
  ADD_EMPLOYEE_TO_TEAM,
  DELETE_EMPLOYEE_TO_TEAM,
  GET_EMPLOYEE_TO_TEAM,
} from "../../../constants/constants";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";

const Teams = () => {
  const [addTeamForm, setAddTeamForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [assignPopup, setAssignPopup] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState();
  // const [teamEmployees, setTeamEmployees] = useState([]);
  // const [teamId, setTeamId] = useState();
  const [addTeam, setAddTeam] = useState({
    name: "",
    description: "",
    orgId: localStorage.getItem("orgId"),
  });
  const { teamDetails, employeesDetails, teamEmployees } = useSelector(
    (state) => state.services
  );

  const { fetchTeams, fetchTeamEmployees } = useContext(UserContext);

  const handleTeamChange = (e) => {
    const { name, value } = e.target;

    setAddTeam({ ...addTeam, [name]: value });
  };

  // const fetchTeamEmployees = async () => {
  //   const response = await fetch(`${GET_EMPLOYEE_TO_TEAM}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const data = await response.json();
  //   setTeamEmployees(data?.employees);
  //   console.log(data, "employee data");
  // };

  // useEffect(() => {
  //   fetchTeamEmployees();
  // }, []);

  const handleAddUpdateTeams = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${ADD_GET_TEAM_DETAILS}${update ? `?teamId=${addTeam.id}` : ""}`,
        // `${ADD_GET_TEAM_DETAILS}`,
        {
          method: update ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(addTeam),
        }
      );
      const data = await response.json();
      console.log(data);
      setAddTeam({
        name: "",
        description: "",
        orgId: localStorage.getItem("orgId"),
      });
      setAddTeamForm(false);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTeamForm = (editTeam) => {
    setAddTeamForm(true);
    setAddTeam(editTeam);
    setUpdate(true);
  };

  const handleDeleteTeam = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${ADD_GET_TEAM_DETAILS}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // body: JSON.stringify(addEmployee),
      });
      const data = await response.json();
      console.log(data);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEmployeeToTeam = async (employeeId) => {
    try {
      const response = await fetch(`${ADD_EMPLOYEE_TO_TEAM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          team_id: selectedTeamId,
          employee_id: employeeId,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchTeamEmployees();
      setAssignPopup(false);
      // fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const addTeamDetails = () => {
    return (
      <div className="add-employee-form">
        <form className="add-employee" onSubmit={handleAddUpdateTeams}>
          <h4>Add Team</h4>
          <div className="label-cont">
            <label htmlFor="name">Team Name</label>
            <input
              required
              id="name"
              type="text"
              placeholder="Enter team name"
              name="name"
              value={addTeam?.name}
              onChange={handleTeamChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="description">Description</label>
            <input
              required
              id="description"
              type="text"
              placeholder="Enter description"
              name="description"
              value={addTeam?.description}
              onChange={handleTeamChange}
            />
          </div>

          <div className="add-employee-btn-containers">
            <button
              onClick={() => setAddTeamForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="create-btn">
              {update ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const addEmployeeToTeam = () => {
    return (
      <div className="add-employee-form">
        <form className="add-employee">
          <div className="horizontal-container ">
            <h4>Edit Assignment</h4>
            <button className="close-btn" onClick={() => setAssignPopup(false)}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
          <p className="assgin-description">
            Select an employee to assign to Platform Team
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {employeesDetails?.map((eachEmployee) => {
              const filteredCheckEmployees = teamEmployees?.find(
                (eachTeamEmploy) =>
                  eachTeamEmploy?.employee_id === eachEmployee.id &&
                  eachTeamEmploy?.team_id === selectedTeamId
              );

              return (
                <div
                  className="horizontal-container recent-active-item-container"
                  style={{
                    cursor: filteredCheckEmployees ? "not-allow" : "pointer",
                    pointerEvents: filteredCheckEmployees && "none",
                  }}
                  key={eachEmployee?.id}
                  onClick={() => {
                    handleAddEmployeeToTeam(eachEmployee?.id);
                  }}
                >
                  <div className="recent-active-item-container">
                    <div className="user-info">
                      <div className="avatar">
                        {eachEmployee?.employeeName[0]?.toUpperCase()}
                      </div>
                      <div className="admin-container">
                        <h3 className="user-name">
                          {eachEmployee?.employeeName}
                        </h3>
                        <p className="user-org">{eachEmployee?.position}</p>
                      </div>
                    </div>
                  </div>
                  <button className="close-btn">
                    {/* <IoIosCloseCircleOutline /> */}
                    {filteredCheckEmployees && (
                      <TiTick style={{ color: "green" }} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    );
  };

  const handleDeleteFromTeam = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${DELETE_EMPLOYEE_TO_TEAM}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      fetchTeams();
      fetchTeamEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-common-container">
      <div className="employee-title-container">
        <h1>Teams</h1>
        <button
          onClick={() => setAddTeamForm(true)}
          className="add-employee-btn"
        >
          + Add Team
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {teamDetails?.map((eachTeam) => {
          const filteredEmployees = teamEmployees?.filter(
            (eachTeamEmploy) => eachTeamEmploy.team_id === eachTeam.id
          );
          return (
            <div className="recent-activity-container">
              <div className="horizontal-container">
                <div className="user-info">
                  <div className={"admin-container"}>
                    <h3 className="user-name">{eachTeam?.name}</h3>
                    <p className="user-org">{eachTeam?.description}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    className="btn"
                    onClick={() => handleEditTeamForm(eachTeam)}
                  >
                    <FiEdit2 style={{ color: "#2563eb" }} />
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleDeleteTeam(eachTeam?.id)}
                  >
                    <MdDeleteOutline style={{ color: "#dc2626" }} />
                  </button>
                </div>
              </div>
              <div className="horizontal-container">
                <p className="emp-title">Team Members</p>
                <p className="sub-title">{`${filteredEmployees?.length} members}`}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {filteredEmployees?.map((filterItem) => (
                  <div className="horizontal-container recent-active-item-container">
                    <div className="recent-active-item-container">
                      <div className="user-info">
                        <div className="avatar">
                          {filterItem?.employeeName[0]?.toUpperCase()}
                        </div>
                        <div className="admin-container">
                          <h3 className="user-name">
                            {" "}
                            {filterItem?.employeeName}
                          </h3>
                          <p className="user-org">{filterItem?.position}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="close-btn"
                      onClick={() => handleDeleteFromTeam(filterItem?.id)}
                    >
                      <IoIosCloseCircleOutline />
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  className="assign-btn"
                  onClick={() => {
                    setAssignPopup(true);
                    setSelectedTeamId(eachTeam?.id);
                  }}
                >
                  + Assign Employee
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div>{addTeamForm && addTeamDetails()}</div>
      <div>{assignPopup && addEmployeeToTeam()}</div>
    </div>
  );
};

export default Teams;
