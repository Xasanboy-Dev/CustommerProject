import { PrismaClient } from "@prisma/client";
import { removeUserFromChat } from "./chat";
import { removeUserFromCourse } from "./course";
import { removeMessageFromUserId } from "./message";
import { HashPassword } from "./Auth/password";

const prisma = new PrismaClient();

export async function getOneUserById(userId: number) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function addUser(
  name: string,
  lastname: string,
  phoneNumber: string,
  password: string
) {
  let hash = await HashPassword(password)
  return await prisma.user.create({
    data: {
      lastname,
      name,
      phoneNumber,
      password: hash,
    },
  });
}

export async function editUser(
  id: number,
  name: string,
  lastname: string,
  phoneNumber: string,
  lastMessage: string,
  lastMessageID: number,
  messages: number[],
  connectedChats: number[],
  password: string,
  comments: number[],
) {
  let hash = await HashPassword(password)
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    return await prisma.user.update({
      where: { id },
      data: {
        connectedChats,
        lastMessage,
        lastMessageID,
        lastname,
        messages,
        name,
        phoneNumber,
        password: hash,
        comments
      },
    });
  }
  return user
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
    await removeMessageFromUserId(user.id);
    return await prisma.user.delete({ where: { id } });
  }
}

export async function getUserByPhoneNumber(phoneNumber: string) {
  return await prisma.user.findUnique({ where: { phoneNumber } })
}

export async function findCommentById(userID: number) {
  return await prisma.comment.findMany({ where: { ownerId: userID } })
}