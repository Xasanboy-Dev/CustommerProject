import { PrismaClient } from "@prisma/client";
import { removeUserFromChat } from "./chat";
import { removeUserFromCourse } from "./course";
import { removeMessageFromUserId } from "./message";

const prisma = new PrismaClient();

export async function getOneUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function addUser(
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  return await prisma.user.create({
    data: {
      email,
      lastname,
      name,
      phoneNumber,
      password,
    },
  });
}

export async function editUser(
  id: number,
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  lastMessage: string,
  lastMessageID: number,
  messages: number[],
  connectedChats: number[]
) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    await prisma.user.update({
      where: { id },
      data: {
        connectedChats,
        email,
        lastMessage,
        lastMessageID,
        lastname,
        messages,
        name,
        phoneNumber,
      },
    });
  }
}

export async function removeUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    let connectedCourses = user.connectedCourses;
    connectedCourses.map(async (id: number) => {
      await removeUserFromCourse(user.id, id);
    });
    let connectedChats = user.connectedChats;
    connectedChats.map(async (id: number) => {
      await removeUserFromChat(user.id, id);
    });
    let deletedMessages = await removeMessageFromUserId(user.id);
    return await prisma.user.delete({ where: { id } });
  }
}

export async function LoginUser(email: string,password:string);
