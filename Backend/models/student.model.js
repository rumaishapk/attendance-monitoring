import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter your name"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
const Student = mongoose.model("student", studentSchema);
export default Student;
