const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const topicRoutes = require("./routes/topicRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGO_URI ||"mongodb://localhost:27017/study")
  .then((result) => app.listen(process.env.PORT||8000 ))
  .catch((err) => console.log(err));


//middlewares
app.use(express.json());
//app.use(express.urlencoded());
app.use(morgan("dev"));
//app.use("/", filterTopicsRoutes);
app.use("/api/user", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);
