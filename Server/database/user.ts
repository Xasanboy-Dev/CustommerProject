import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export async function checkUserExistById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function checkUserByPhoneNumber(number: string) {
  return await prisma.user.findUnique({ where: { number } });
}

export async function createUser(
  name: string,
  lastname: string,
  phoneNumber: string,
  course: string
) {
  return await prisma.user.create({
    data: {
      lastname,
      name,
      number: phoneNumber,
      course,
    },
  });
}

export async function updateUser(
  name: string,
  lastname: string,
  phoneNumber: string,
  imageURL: string,
  id: number
) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: { imageURL, lastname, name, number: phoneNumber },
  });
}

export async function removeUser(id: number) {
  const deletedUser = await prisma.user.delete({ where: { id } });
  let imageURL = deletedUser.id;
  let path = `./../../uploads/USER${id}.png`;
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`File dleted!`);
    }
  });
}
