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
        const response = await axios.put(
          `http://localhost:3000/student/${id}`,
          studentObject,
        );
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
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            {isediting ? "Update Student Profile" : "Register New Student"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isediting
              ? "Make changes to student information"
              : "Enter details to add a student to the system"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="name"
              className="m-2"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              required
            />
          </div>
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
          <Button
            className={`w-full ${isediting ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}`}
            onClick={handleSubmit}
          >
            {" "}
            {isediting ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentData;
