import { TypeUser } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export function SignToken(
  id: number,
  name: string,
  lastname: string,
  phoneNumber: string,
  role: TypeUser,
  lastMessage: string,
  lastMessageID: number,
  messages: number[],
  connectedCourses: number[],
  connectedChats: number[]
) {
  const payload = {
    id,
    name,
    lastname,
    phoneNumber,
    role,
    lastMessage,
    lastMessageID,
    messages,
    connectedCourses,
    connectedChats,
  };
  return jwt.sign(payload, SECRET_KEY!);
}

export function VerifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY!);
}
