import express  from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {app.listen(process.env.PORT)
    console.log("Connected to db server")
  }).catch((err) => console.log(err));

app.get('/health',(req,res)=>{
    res.send('fine , working !');
})

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);

export default app;