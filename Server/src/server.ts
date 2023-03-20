import dotenv from "dotenv";
dotenv.config();

import express from "express";
import user from "./../router/user";
import message from "./../router/message";
import chat from "./../router/chat";

const server = express();
const PORT = process.env.PORT;

server.use("/user", user);
server.use("/message", message);
server.use("/chat", chat);

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}/`);
});
