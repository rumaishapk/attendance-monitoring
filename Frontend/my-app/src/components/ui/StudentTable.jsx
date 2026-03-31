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
    <Table>
      <TableCaption>List of Students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SL.NO</TableHead>
          <TableHead>Students Name</TableHead>
          <TableHead>Email_ID</TableHead>
          <TableHead>PhoneNo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow
            onClick={() => navigate(`/student-details/${student._id}`)}
            key={student._id || index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{student.username}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.phoneNo}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(student._id)}>Delete</Button>
              <Button onClick={() => handleEdit(student._id)}>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
