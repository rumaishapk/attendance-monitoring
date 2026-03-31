import React, { useEffect } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentData = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [isediting, setIsediting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && setIsediting(true);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentObject = {
      username,
      email,
      phoneNo,
      password,
    };

    try {
      if (isediting) {
        const response = await axios.put(`http://localhost:3000/student/${id}`,studentObject);
        console.log("Updated Successfully:", response.data);
      } else {
        const response = await axios.post("http://localhost:3000/student/", {
          username,
          email,
          phoneNo,
          password,
        });

        console.log("Success:", response.data);
      }

      navigate("/Dashboard");
      setIsediting(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col w-1/4">
      <h1> Student Data</h1>
      <Input
        placeholder="name"
        className="m-2"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        value={username}
      />
      <Input
        placeholder="email"
        className="m-2"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
      />
      <Input
        type="number"
        placeholder="phoneNo"
        className="m-2"
        onChange={(event) => {
          setPhoneNo(event.target.value);
        }}
        value={phoneNo}
      />
      <Input
        placeholder="password"
        className="m-2"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <Button onClick={handleSubmit}> {isediting ? "Update" : "Submit"}</Button>
    </div>
  );
};

export default StudentData;
