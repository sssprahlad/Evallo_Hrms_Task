import { createContext } from "react";
import {
  ADD_GET_TEAM_DETAILS,
  GET_EMPLOYEE_DETAILS,
  GET_EMPLOYEE_TO_TEAM,
} from "../constants/constants";
import { useDispatch } from "react-redux";
import {
  setEmployeeDetails,
  setTeamDetails,
  setTeamEmployees,
} from "../redux/reducer/services";
import { useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [employees, setEmployees] = useState();
  const orgId = localStorage.getItem("orgId");
  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    const response = await fetch(`${GET_EMPLOYEE_DETAILS}?orgId=${orgId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data, "employee data");
    setEmployees(data.employees_list);
    dispatch(setEmployeeDetails(data.employees_list));
  };

  const fetchTeams = async () => {
    const response = await fetch(`${ADD_GET_TEAM_DETAILS}?orgId=${orgId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data, "employee data");
    // teamDetails(data.employees_list);
    dispatch(setTeamDetails(data.team_list));
  };

  const fetchTeamEmployees = async () => {
    const response = await fetch(`${GET_EMPLOYEE_TO_TEAM}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    dispatch(setTeamEmployees(data?.employees));
    console.log(data, "employee data");
  };

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
    fetchTeamEmployees();
  }, []);

  return (
    <UserContext.Provider
      value={{ employees, fetchEmployees, fetchTeams, fetchTeamEmployees }}
    >
      {children}
    </UserContext.Provider>
  );
};
