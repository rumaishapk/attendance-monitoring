import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/student.route.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/student", studentRouter);

app.get("/", (req, res) => {
  return res.send("hello from attendance server updated");
});

mongoose
  .connect(
    "mongodb+srv://rumaishapk:rumi257480@nodeapi.ju5tqrt.mongodb.net/?appName=attendance",
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed!");
  });

  app.listen(3000, () => {
  console.log(" Server is running on port 3000");
});
