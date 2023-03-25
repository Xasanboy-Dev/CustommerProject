import dotenv from "dotenv";
dotenv.config();

import express from "express";
import user from "./../router/user";
import message from "./../router/message";
import chat from "./../router/chat";
import cors from "cors";
import Comment from "./../router/Comments/comment"

const server = express();
const PORT = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", user);
server.use("/message", message);
server.use("/chat", chat);
server.use("/comment", Comment)

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}/`);
});
