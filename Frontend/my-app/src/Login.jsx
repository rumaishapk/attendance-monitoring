import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  console.log("Username:", username);
  console.log("Password:", password);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/student/login", {
        username,
        password,
      });
      console.log("Login success:", response.data);
      if (response.data.user.admin) {
        navigate("/Dashboard");
      } else {
        navigate("/student-view");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1 className="heading">EduScholar Trace</h1>
        <div className="input-group">
          <input
            className="input1"
            type="text"
            placeholder="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <input
            className="input1"
            type="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <button className="submit-btn" onClick={handleLogin}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
