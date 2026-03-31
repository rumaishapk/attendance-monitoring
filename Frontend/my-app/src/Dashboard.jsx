import React from "react";
import { StudentTable } from "./components/ui/StudentTable";
import { Button } from "./components/ui/button";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Top Header Section */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Student Management
          </h1>
          <p className="text-sm text-slate-500">
            View and manage student records
          </p>
        </div>
        <Button
          onClick={() => navigate("/students")}
          className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 items-center px-5 shadow-sm"
        >
          Create New
        </Button>
      </div>
<div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
