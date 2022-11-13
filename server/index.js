const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const topicRoutes = require("./routes/topicRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");
//connect to mongo
//const dbURI = "mongodb+srv://splash:splash@blog.msufnqt.mongodb.net/blogdb";
const dbURI2 = "mongodb://localhost:27017/study";
//asynchrenous
mongoose
  .connect(dbURI2)
  .then((result) => app.listen(8000))
  .catch((err) => console.log(err));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
//app.use("/", filterTopicsRoutes);
app.use("/api/user", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);
