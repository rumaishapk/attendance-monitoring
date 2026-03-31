import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Studentdetails = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student/${id}`);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPhoneNo(response.data.phoneNo);
        setPassword(response.data.password);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudent();
  }, []);

  return (
    <div className="details-container">
      <div className="details-card">
        <h1>Student Deatails</h1>
        <div className="info-row">
          <span className="info-label">Name:</span>
          <div className="info-value">{username}</div>
        </div>
        <div className="info-row">
          <span className="info-label">Email:</span>
          <div className="info-value">{email}</div>
        </div>

        <div className="info-row">
          <span className="info-label">Phone:</span>
          <div className="info-value">{phoneNo}</div>
        </div>

        <div className="info-row">
          <span className="info-label">Password:</span>
          <div className="info-value">******</div>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Studentdetails;
