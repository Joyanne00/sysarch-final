import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });
     
      if(response.data.success) {
        console.log(response.data)
        // store userId in localstorage
        localStorage.setItem("userId", response.data.user._id)
        navigate("/dashboard");
      }else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      setError(error.response?.data?.message); // Display error message
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Show errors if any */}
      <form onSubmit={handleLogin} className="form-1">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        <p> 
            Dont have an account? <Link to="/signup">Click here</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
