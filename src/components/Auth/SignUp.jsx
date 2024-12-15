import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState(""); // Used to show error messages
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError("All fields are required."); // Set error message
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match."); // Set error message
      return;
    }

    const response = await axios.post('/api/signup', {
      name,
      email,
      password,
      phone
    });

    if(response.data.success) {
      // store id in localStorage hehe
      localStorage.setItem("userId", response.data.user._id)
      navigate("/dashboard")
    } else {
      setError("An error occurred. Please try again.")
    }
    // // Simulate successful user registration
    // try {
    //   console.log("User registered:", { email, password });
    //   alert("Registration successful! Redirecting to dashboard...");
    //   navigate("/dashboard");
    // } catch {
    //   setError("An error occurred. Please try again."); // Set error message
    // }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      <form onSubmit={handleSignUp}>
      <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
    
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone #</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className="signup-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
