import express from "express";
import{
    getStudents,
    getStudent,
    createStudent,
    UpdatedStudent,
    deleteStudent,
    login
} from "../controllers/student.controllers.js"

const router = express.Router();
router.get("/",  getStudents);

router.get("/:id", getStudent);

router.post("/", createStudent);

router.put("/:id", UpdatedStudent);

router.delete("/:id", deleteStudent);

router.post("/login", login);

export default router;
