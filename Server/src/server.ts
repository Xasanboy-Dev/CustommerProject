import dotenv from "dotenv";
dotenv.config();

export let url = "http://localhost";

import express from "express";
import cors from "cors";
import user from "./../router/user";
import admin from "./../router/admin";
import course from "./../router/course";

const server = express();
const PORT = process.env.PORT || 8080;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", user);
server.use("/admin", admin);
server.use("/course", course);

server.listen(PORT, () => {
  console.log(`SERVER: ${url}:${PORT}`);
});
