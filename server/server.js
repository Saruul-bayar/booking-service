import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// importing ROUTES
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import usersRouter from "./routes/users.js";
dotenv.config();
const app = express();

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI);
  } catch (error) {
    throw error;
  }
};

// decalring MIDDLEWARES
// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || "Something went wrong!";
//   return res.status(errStatus).json({
//     success: false,
//     status: errStatus,
//     message: errMessage,
//     stack: err.stack,
//   });
// });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);

mongoose.connection.on("disconnected", () => {
  console.log("DISCONNECTED");
});
mongoose.connection.on("connected", () => {
  console.log("CONNECTED");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`DB connected and listening on port ${port}`);
});
