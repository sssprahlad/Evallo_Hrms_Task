import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterOrg from "./components/Organisation/RegisterOrg/RegisterOrg";
import Login from "./components/Organisation/Login/Login";
import ProtectedRoute from "./constants/ProtectedRoute";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Teams from "./components/Pages/Teams/Teams";
import Employees from "./components/Pages/Employees/Employees";
import Logs from "./components/Pages/Logs/Logs";
import MainComponent from "./components/MainComponent/MainComponent";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterOrg />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainComponent />} />
            {/* <Route path="/teams" element={<Teams />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/logs" element={<Logs />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
