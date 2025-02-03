import express, { Application } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import connectDB from "./config/mongo";

const app: Application = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
connectDB();

io.on("connection", (socket: Socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`a user disconnected ${socket.id}`);
    });
  });


export default server;