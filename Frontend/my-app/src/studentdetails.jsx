import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const Studentdetails = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

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
    <div>
      <h1>Student Deatails</h1>
      <div>{username}</div>
      <div>{email}</div>
      <div>{phoneNo}</div>
      <div>{password}</div>
    </div>
  );
};

export default Studentdetails;
