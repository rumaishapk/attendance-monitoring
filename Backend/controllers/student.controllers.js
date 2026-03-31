import Student from "../models/student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secretkey = process.env.JWT_SECRET || "attendance-secret";
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    if (!student) {
      return res.status(404).json({ message: "student not find" });
    }
    const UpdatedStudent = await Student.findById(id);
    res.status(200).json(UpdatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createStudent = async (req, res) => {
  try {
    const { username, password, phoneNo, email } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);

    const userinfo = {
      username,
      password: hash,
      phoneNo,
      email
    };

    const user = await Student.create(userinfo);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const UpdatedStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    if (!student) {
      return res.status(404).json({ message: "student not find" });
    }
    const UpdatedStudent = await Student.findById(id);
    res.status(200).json(UpdatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      res.status(404).json({ message: "student not find" });
    }
    res.status(200).json({ message: "student deleted sucsessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await Student.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "incorrect password" });
    }

    const token = jwt.sign({ user }, secretkey, { expiresIn: "1d" });
    res.status(200).json({ token ,user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  getStudents,
  getStudent,
  createStudent,
  UpdatedStudent,
  deleteStudent,
  login
};
