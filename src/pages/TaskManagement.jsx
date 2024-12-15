import { useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar"; // Import Navbar
import './TaskManagement.css';
import { useLocation } from "react-router-dom";

const TaskManagement = ({ tasks, setTasks }) => {
  const { pathname } = useLocation()
  console.log('location', location)
  const [newTask, setNewTask] = useState("");

  console.log("TASKS", tasks)


  const addTask = async () => {
    if (newTask.trim() === "") {
      alert("Please enter a valid task.");
      return;
    }

    if (tasks.includes(newTask.trim())) {
      alert("This task already exists.");
      return;
    }

   try {
    const response = await axios.post(`/api/tasks?userId=${localStorage.getItem("userId")}`, {
      description: newTask
    });

    if(response.data.success) {
      alert("Task added successfully")

      // append the newly created and returned from server task
      setTasks([...tasks, response.data.task])
    }
   } catch (e) {
    console.log(e)
    alert("Error adding task, check log")
   }
   // clear input field
    setNewTask("");
  };

  

  const removeTask = async (taskToRemove) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskToRemove._id}?userId=${localStorage.getItem("userId")}`)
      if(response.data.success) {
        alert(response.data.message)
      }
    } catch (e) {
      alert("Error deleting task, check log")
      console.log(e)
    }
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  return (
    <div style={styles.container}>
      {pathname !== "/dashboard" && <Navbar />} {/* Include Navbar here  only include if ang route is dle dashboard hehe*/}
      <h1 style={styles.h1}>Task Management</h1>
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={styles.input}
      />
      <button onClick={addTask} style={styles.button}>Add Task</button>
      <ul style={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            <p style={styles.description}>{task.description} </p>
            <button onClick={() => removeTask(task)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 4px 4px rgba(0, 0, 0, 0.1)",
  },
  h1: {
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#4e8ef7",
    width: "fit-content"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "black"
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "0.8rem",
    cursor: "pointer",
  },
  taskList: {
    marginTop: "20px",
    listStyleType: "none",
    paddingLeft: "0",
  },
 
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "8px",
    gap: "10px",
    marginBottom: "8px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  description: {
    color: "black",
    whiteSpace: "nowrap",
  },
  removeButton: {
    fontSize: "0.8rem",
    backgroundColor: "#FF6347",
    fontWeight: 500,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "4px 8px",
    maxWidth: 'fit-content'
  },
};

export default TaskManagement;
