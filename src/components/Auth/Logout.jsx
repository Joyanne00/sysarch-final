import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate clearing user session
    alert("You have been logged out.");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <button onClick={handleLogout} style={styles.logoutButton}>
      Logout
    </button>
  );
};

const styles = {
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Logout;
