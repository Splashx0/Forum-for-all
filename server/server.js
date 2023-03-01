const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const topicRoutes = require("./routes/topicRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
//const cors = require("cors");
require("dotenv").config();
//"mongodb+srv://splash:splash@cluster0.1oixmrj.mongodb.net/forum"
//"mongodb://localhost:27017/study"
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

//middlewares
/*const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));*/
//app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);
