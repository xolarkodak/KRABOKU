import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// connect DB
connectDB();


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in  http://localhost/${PORT}`);
  });
  
