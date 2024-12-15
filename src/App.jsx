import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Settings from "./components/Settings";
import TaskManagement from "./pages/TaskManagement"; // Updated path for TaskManagement

const App = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Dashboard and Profile Routes */}
        <Route path="/dashboard" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Other Routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Task Management */}
        <Route path="/tasks" element={<TaskManagement tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </Router>
  );
};

export default App;
