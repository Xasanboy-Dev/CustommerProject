import { message, PrismaClient, TypeUser } from "@prisma/client"
import { removeUserFromChat } from "./chat"
import { removeUserFromCourse } from "./course"
import { removeMessageFromUserId } from "./message"
import { HashPassword } from "./password"
const prisma = new PrismaClient()

export async function getAllAdmins() {
    return await prisma.user.findMany({ where: { role: "admin" } })
}

export async function getAdminById(id: number) {
    return await prisma.user.findUnique({ where: { id, } })
}


export async function addAdmin(
    name: string,
    lastname: string,
    phoneNumber: string,
    password: string
) {
    let hash = await HashPassword(password)
    return await prisma.user.create({ data: { lastname, name, password: hash, phoneNumber, role: "admin" } })
}

export async function editAdmin(
    id: number,
    name: string,
    lastname: string,
    phoneNumber: string,
    role: TypeUser,
    lastMessage: string,
    lastMessageID: number,
    messages: number[],
    connectedCourses: number[],
    connectedChats: number[],
    password: string
) {
    let hash = await HashPassword(password)
    return await prisma.user.update({
        where: { id },
        data: {
            connectedChats,
            connectedCourses,
            lastMessage,
            lastMessageID,
            lastname,
            messages,
            name,
            password: hash,
            phoneNumber,
            role
        }
    })
}

export async function removeAdmin(adminID: number) {
    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    if (admin) {
        let connectedCourses = admin.connectedCourses;
        connectedCourses.map(async (id: number) => {
            await removeUserFromCourse(admin.id, id);
        });
        let connectedChats = admin.connectedChats;
        connectedChats.map(async (id: number) => {
            await removeUserFromChat(admin.id, id);
        });
        await removeMessageFromUserId(admin.id);
        return await prisma.user.delete({ where: { id: adminID } });
    }
}

export async function getAminWithPhoneNumeber(phoneNumber: string) {
    return await prisma.user.findUnique({ where: { phoneNumber } })
}

export async function nextAdmin(userId: number) {
    return await prisma.user.update({ where: { id: userId }, data: { role: "admin" } })
}

export async function checkAdminValid(id: number) {
    const admin = await prisma.user.findUnique({ where: { id } })
    if (admin) {
        return admin.role == "admin"
    }
}