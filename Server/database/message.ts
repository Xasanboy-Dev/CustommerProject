import { PrismaClient } from "@prisma/client";
import { getOneUserById } from "./user";

const prisma = new PrismaClient();

export async function getAllMessages() {
  return await prisma.message.findMany();
}

export async function getOneMessageById(id: number) {
  return await prisma.message.findUnique({ where: { id } });
}

export async function getUserMessages(userId: number) {
  return await prisma.message.findMany({ where: { ownerId: userId } });
}

export async function removeMessageWithId(id: number) {
  return await prisma.message.delete({ where: { id } });
}

export async function removeMessageFromUserId(userID: number) {
  const user = await getOneUserById(userID);
  if (user) {
    user.messages.map(async (messageID: number) => {
      await removeMessageWithId(messageID);
    });
  }
}
