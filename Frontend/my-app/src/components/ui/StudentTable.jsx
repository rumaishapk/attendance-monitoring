import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "@/components/ui/table";
import axios from "axios";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export function StudentTable() {
  const [students, setStudent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/student/")
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/student/${id}`);
      console.log("Student deleted");
      setStudent(students.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/students/${id}`);
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
    <Table>
      <TableCaption className="pb-4">A list of registered students in EduScholar</TableCaption>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead className="w-[80px] font-bold">SL.NO</TableHead>
          <TableHead className="font-bold" >Students Name</TableHead>
          <TableHead className="font-bold text-center">Email_ID</TableHead>
          <TableHead className="font-bold text-center">PhoneNo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow 
          className="group cursor-pointer hover:bg-slate-50/80 transition-all duration-200"
            onClick={() => navigate(`/student-details/${student._id}`)}
            key={student._id || index}
          >
            <TableCell className="py-4 font-semibold text-slate-800">{index + 1}</TableCell>
            <TableCell className="font-semibold text-slate-700">{student.username}</TableCell>
            <TableCell className="text-center text-slate-600">{student.email}</TableCell>
            <TableCell className="text-center text-slate-600">{student.phoneNo}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
              <Button variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => handleDelete(student._id)}>Delete</Button>
                    
              <Button variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"onClick={() => handleEdit(student._id)}>Edit</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
