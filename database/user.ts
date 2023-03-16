import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function checkUserExistById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
}

export async function checkUserByPhoneNumber(number: string) {
    return await prisma.user.findUnique({ where: { number } })
}

export async function createUser(name: string, lastname: string, phoneNumber: string, course: string) {
    return await prisma.user.create({
        data: {
            lastname,
            name,
            number: phoneNumber,
            course
        }
    })
}