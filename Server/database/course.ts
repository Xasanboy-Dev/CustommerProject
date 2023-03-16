import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findOneCourse(id: number) {
  return await prisma.course.findUnique({ where: { id } });
}

export async function findAllCourse() {
  return await prisma.course.findMany();
}

export async function addCourse(
  imageURL: string,
  name: string,
  teacherID: number,
  teacherName: string
) {
  return await prisma.course.create({
    data: {
      imageURL,
      name,
      teacherID,
      teacherName,
    },
  });
}

export async function editCourse(
  courseID: number,
  imageURL: string,
  name: string,
  teacherID: number,
  teacherName: string,
  createdDate: Date,
  pupils: number[]
) {
  return await prisma.course.update({
    data: {
      imageURL,
      name,
      teacherID,
      teacherName,
      createdDate,
      pupils,
    },
    where: {
      id: courseID,
    },
  });
}

export async function deleteCourse(courseID: number) {
  return await prisma.course.delete({ where: { id: courseID } });
}
