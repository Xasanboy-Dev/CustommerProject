import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

export async function checkAdminExistByID(id: number) {
  return await prisma.admin.findUnique({ where: { id } });
}

export async function checkAdminExistByNumber(number: string) {
  return await prisma.admin.findUnique({ where: { phoneNumber: number } });
}

export async function addAdmin(
  name: string,
  lastname: string,
  phoneNumber: string,
  imageURL: string
) {
  return await prisma.admin.create({
    data: { lastname, name, phoneNumber, imageURL },
  });
}

export async function updateAdmin(
  name: string,
  lastname: string,
  phoneNumber: string,
  id: number
) {
  return await prisma.admin.update({
    where: { id },
    data: {
      lastname,
      name,
      phoneNumber,
    },
  });
}

export async function deleteAdmin(id: number, imageURL: string) {
  const deletedAdmin = await prisma.admin.delete({ where: { id } });
  const filePath = `./../uploads/${imageURL}`;
  console.log(filePath);
  fs.unlinkSync(filePath);
}

export async function getAllAdmins() {
  return await prisma.admin.findMany();
}
