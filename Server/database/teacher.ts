import { PrismaClient, Rank } from "@prisma/client";
const prisma = new PrismaClient();

export async function findTeacherById(id: number) {
  return await prisma.teacher.findUnique({ where: { id } });
}

export async function findTeacherExistNumber(phoneNumber: string) {
  return await prisma.teacher.findUnique({ where: { phoneNumber } });
}

export async function findAllTeachers() {
  return await prisma.teacher.findMany();
}

export async function editTeacherData(
  id: number,
  name: string,
  phoneNumber: string,
  lastname: string,
  email: string
) {
  return await prisma.teacher.update({
    data: { email, lastname, name, phoneNumber },
    where: { id },
  });
}

export async function addTeacher(
  name: string,
  phoneNumber: string,
  lastname: string,
  email: string,
  lengtWork: Rank
) {
  return await prisma.teacher.create({
    data: { lastname, name, phoneNumber, email, lengtWork },
  });
}

export async function deleteTeacher(id: number) {
  return await prisma.teacher.delete({ where: { id } });
}
