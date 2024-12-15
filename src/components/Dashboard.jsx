import { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar"; // Updated path to Navbar
import TaskManagement from "../pages/TaskManagement"; // Correct path to TaskManagement
import Notifications from "./Notifications";

import "./Dashboard.css";

const Dashboard = ({ tasks, setTasks}) => {
     // e get natong task specific ani nga user
     useEffect(() => {
      const getTasks = async () => {
        const response = await axios.get(`/api/tasks?userId=${localStorage.getItem("userId")}`)
        if(response.data.success) {
          console.log(response.data)
          setTasks(response.data.tasks)
        } else {
          alert("Error getting tasks, check console")
        }
      }
      getTasks()
    }, [])
    
  const today = new Date().toISOString().split("T")[0];
  const tasksDueToday = tasks.filter((task) => task.dueDate === today);
  const overdueTasks = tasks.filter((task) => new Date(task.dueDate) < new Date(today));
  const highPriorityTasks = tasks.filter((task) => task.priority === "High");

  return (
    <div className="dashboard-container">
      {/* Include Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="content-container">
        <h1>Dashboard</h1>

        {/* Summary Cards */}
        <div className="dashboard-summary">
          <div className="summary-item">
            <h3>Tasks Due Today</h3>
            <p>{tasksDueToday.length}</p>
          </div>
          <div className="summary-item">
            <h3>Overdue Tasks</h3>
            <p>{overdueTasks.length}</p>
          </div>
          <div className="summary-item">
            <h3>High Priority Tasks</h3>
            <p>{highPriorityTasks.length}</p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="dashboard-grid">
          {/* Left Section: Task Management */}
          <div className="card">
            <h3>Task Management</h3>
            <TaskManagement tasks={tasks} setTasks={setTasks} />
          </div>

          {/* Right Section: Notifications */}
          <div className="card">
            <h3>Notifications</h3>
            <Notifications />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
