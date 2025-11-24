import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    employeesDetails: [],
    teamDetails: [],
    teamEmployees: [],
    systemLogs: [],
  },
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employeesDetails = action.payload;
    },

    setTeamDetails: (state, action) => {
      state.teamDetails = action.payload;
    },

    setSystemLogs: (state, action) => {
      state.systemLogs = action.payload;
    },
    setTeamEmployees: (state, action) => {
      state.teamEmployees = action.payload;
    },
  },
});

export default servicesSlice.reducer;
export const {
  setEmployeeDetails,
  setTeamDetails,
  setSystemLogs,
  setTeamEmployees,
} = servicesSlice.actions;
