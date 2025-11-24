import React, { use, useEffect, useState } from "react";
import "./Employees.css";
import { IoSearchOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import {
  ADD_EMPLOYEE_DETAILS,
  GET_EMPLOYEE_DETAILS,
} from "../../../constants/constants";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../../../context/context";

const Employees = () => {
  const [addEmployeeForm, setAddEmployeeForm] = useState(false);
  const [addEmployee, setAddEmployee] = useState({
    employeeName: "",
    email: "",
    position: "",
    department: "",
    phone: "",
    date: "",
    orgId: localStorage.getItem("orgId"),
  });
  const { employeesDetails, teamEmployees, teamDetails } = useSelector(
    (state) => state.services
  );
  const [editEmployee, setEditEmployee] = useState(false);
  const { fetchEmployees } = useContext(UserContext);
  const [searchQuary, setSearchQuary] = useState("");
  const [searchData, setSearchData] = useState([]);

  const orgId = localStorage.getItem("orgId");
  console.log(orgId, "id");

  const handleAddEmployeeInputChange = (e) => {
    const { name, value } = e.target;

    setAddEmployee({ ...addEmployee, [name]: value });
  };

  useEffect(() => {
    if (searchQuary?.length > 0) {
      const data = employeesDetails?.filter((each) =>
        each?.employeeName?.includes(searchQuary)
      );
      setSearchData(data);
    } else {
      setSearchData(employeesDetails);
    }
  }, [employeesDetails, searchQuary]);

  const handleCreateAndUpdateEmployee = async (e) => {
    e.preventDefault();
    console.log(addEmployee, "employee details");
    try {
      const response = await fetch(
        `${ADD_EMPLOYEE_DETAILS}${
          editEmployee ? `?employeeId=${addEmployee.id}` : ""
        }`,
        {
          method: editEmployee ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(addEmployee),
        }
      );
      const data = await response.json();
      console.log(data);
      setAddEmployee({
        employeeName: "",
        email: "",
        position: "",
        department: "",
        phone: "",
        date: "",
        orgId: localStorage.getItem("orgId"),
      });
      setAddEmployeeForm(false);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const addEmployeeDetails = () => {
    return (
      <div className="add-employee-form">
        <form className="add-employee">
          <h4>Add Employee</h4>
          <div className="label-cont">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={addEmployee?.employeeName}
              placeholder="Enter full name"
              name="employeeName"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={addEmployee?.email}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="position">Position</label>
            <input
              id="position"
              value={addEmployee?.position}
              type="text"
              placeholder="Enter position"
              name="position"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="department">Department</label>
            <input
              value={addEmployee.department}
              id="department"
              type="text"
              placeholder="Enter department"
              name="department"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="phone">Phone Number</label>
            <input
              value={addEmployee?.phone}
              id="phone"
              type="text"
              placeholder="Enter phone number"
              name="phone"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="label-cont">
            <label htmlFor="date">Date</label>
            <input
              value={addEmployee?.date}
              id="date"
              type="date"
              name="date"
              onChange={handleAddEmployeeInputChange}
            />
          </div>
          <div className="add-employee-btn-containers">
            <button
              onClick={() => setAddEmployeeForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              className="create-btn"
              onClick={handleCreateAndUpdateEmployee}
            >
              {editEmployee ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const handleEditForm = (edit) => {
    setAddEmployeeForm(true);
    setAddEmployee(edit);
    setEditEmployee(true);
  };

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${ADD_EMPLOYEE_DETAILS}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // body: JSON.stringify(addEmployee),
      });
      const data = await response.json();
      console.log(data);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-common-container">
      <div className="employee-title-container">
        <h1>Employees</h1>
        <button
          onClick={() => setAddEmployeeForm(true)}
          className="add-employee-btn"
        >
          + Add Employee
        </button>
      </div>
      <div className="recent-activity-container">
        <div className="search-container">
          <IoSearchOutline />
          <input
            type="search"
            placeholder="Search employees"
            onChange={(e) => setSearchQuary(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {searchData?.map((eachItem) => {
          const nameLatter = eachItem?.employeeName[0]?.toUpperCase();
          const filteredCheckEmployees = teamDetails?.map((eachTeam) =>
            teamEmployees?.filter(
              (eachFilter) => eachTeam?.id === eachFilter?.team_id
            )
          );

          const checkTeam = teamEmployees?.filter(
            (each) => each.id === eachItem.team_id
          );
          console.log(filteredCheckEmployees, "checkout");
          console.log(checkTeam, "ch");

          return (
            <div className="recent-activity-container" key={eachItem?.id}>
              <div className="horizontal-container">
                <div className="user-info">
                  <div className="avatar">{nameLatter}</div>
                  <div className={"admin-container"}>
                    <h3 className="user-name">{eachItem?.employeeName}</h3>
                    <p className="user-org">{eachItem?.position}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    className="btn"
                    onClick={() => handleEditForm(eachItem)}
                  >
                    <FiEdit2 style={{ color: "#2563eb" }} />
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleDeleteItem(eachItem.id)}
                  >
                    <MdDeleteOutline style={{ color: "#dc2626" }} />
                  </button>
                </div>
              </div>

              <div className="emp-details-container">
                <div className="employee-row-cont">
                  <p className="emp-title">Email :</p>
                  <p className="sub-title">{eachItem?.email}</p>
                </div>
                <div className="employee-row-cont">
                  <p className="emp-title">Detartment :</p>
                  <p className="sub-title">{eachItem?.department}</p>
                </div>
                <div className="employee-row-cont">
                  <p className="emp-title">Phone :</p>
                  <p className="sub-title">{eachItem?.phone}</p>
                </div>

                <div className="employee-row-cont">
                  <p className="emp-title">Joined :</p>
                  <p className="sub-title">{eachItem?.date}</p>
                </div>
              </div>

              <div className="emp-teams-container">
                <p>TEAMS</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <button className="emp-team-btn">
                    <div>Platform Engineer</div>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="popup-container">
        {addEmployeeForm && addEmployeeDetails()}
      </div>
    </div>
  );
};

export default Employees;
