import { PrismaClient } from "@prisma/client";
import { getOneUserById } from "./user";
const prisma = new PrismaClient();

export async function getAllChats() {
  return await prisma.chat.findMany();
}

export async function getOneChatById(chatId: number) {
  return await prisma.chat.findUnique({ where: { id: chatId } });
}

export async function removeUserFromChat(userID: number, chatID: number) {
  const user = await getOneUserById(userID);
  const chat = await getOneChatById(chatID);
  if (user && chat) {
    let users = chat.users;
    users = users.filter((id: number) => id !== user.id);
    return await prisma.chat.update({
      data: { users },
      where: { id: chat.id },
    });
  }
}
