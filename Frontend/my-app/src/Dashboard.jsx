import React from "react";
import { StudentTable } from "./components/ui/StudentTable";
import { Button } from "./components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { DatePicker } from "./components/ui/DatePicker";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

 const navigate = useNavigate();


  const datas = [
    {
      title: "Total Students",
      count: 60,
    },
    {
      title: "Present",
      count: 50,
    },
    {
      title: "Absent",
      count: 10,
    },
  ];
  return (
    <div>
      <StudentTable />
      <Button onClick={() =>{navigate("/students")}}> Create</Button>

      {datas.map((data) => (
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardTitle>{data.title} : {data.count}</CardTitle>
        </Card>
      ))}
      <DatePicker />
    </div>
  );
};

export default Dashboard;
