const API_BASE_URL =
  "https://evallo-hrms-task.onrender.com" || "http://localhost:5000";

export const LOGIN_API = `${API_BASE_URL}/api/auth/login`;
export const REGISTER_API = `${API_BASE_URL}/api/auth/register`;

// Employee Api's
export const ADD_EMPLOYEE_DETAILS = `${API_BASE_URL}/api/auth/employee`;
export const GET_EMPLOYEE_DETAILS = `${API_BASE_URL}/api/auth/employee-by-org`;

// Team Api's

export const ADD_GET_TEAM_DETAILS = `${API_BASE_URL}/api/auth/teams`;

export const ADD_EMPLOYEE_TO_TEAM = `${API_BASE_URL}/api/auth/assign`;

export const DELETE_EMPLOYEE_TO_TEAM = `${API_BASE_URL}/api/auth/assign`;

export const GET_EMPLOYEE_TO_TEAM = `${API_BASE_URL}/api/auth/team-employees`;
