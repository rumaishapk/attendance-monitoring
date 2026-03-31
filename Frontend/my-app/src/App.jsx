import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import StudentData from "./studentdata";
import StudentDetails from "./studentdetails";
import StudentView from "./studentview";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students/:id" element={<StudentData />} />
        <Route path="/students" element={<StudentData />} />
        <Route path="/student-details/:id" element={<StudentDetails />} />
        <Route path="/student-view" element={<StudentView />} />
      </Routes>
    </div>
  );
};

export default App;
