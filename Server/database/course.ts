import { PrismaClient } from "@prisma/client";
import { getOneUserById } from "./user";
import { Courses } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCourses() {
  return await prisma.course.findMany();
}

export async function getOneCourseById(id: number) {
  return await prisma.course.findUnique({ where: { id } });
}

export async function editCourse(
  id: number,
  name: string,
  type: Courses,
  teacherName: string,
  teacherId: number,
  pupils: number[]
) {
  return await prisma.course.update({
    where: { id },
    data: {
      name,
      pupils,
      teacherId,
      teacherName,
      type,
    },
  });
}

export async function removeUserFromCourse(userID: number, courseID: number) {
  const user = await getOneUserById(userID);
  const course = await getOneCourseById(courseID);
  if (user && course) {
    let pupils = course.pupils;
    pupils = pupils.filter((id: number) => id !== userID);
    return await editCourse(
      course.id,
      course.name,
      course.type,
      course.teacherName,
      course.teacherId,
      pupils
    );
  }
}
