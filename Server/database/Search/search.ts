import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function findSearchingUsers(userName: string) {
    return await prisma.user.findMany({
        where: {
            name: {
                contains: userName,
            }
        }
    })
}

export async function findSearchingPupils(pupilsName: string) {
    return await prisma.user.findMany({
        where: {
            name: {
                contains: pupilsName
            }
        }
    })
}

export async function findSearchingTeachers(teacherName: string) {
    return await prisma.teacher.findMany({
        where: {
            name: {
                contains: teacherName
            }
        }
    })
}