import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function getAllComments() {
    return await prisma.comment.findMany()
}

export async function findCommentById(commentId: number) {
    return await prisma.comment.findUnique({ where: { id: commentId } })
}

export async function findCommentsByOwnerId(userID: number) {
    return await prisma.comment.findMany({ where: { ownerId: userID } })
}

export async function createComment(ownerId: number, ownerName: string, text: string) {
    const comment = await prisma.comment.create({ data: { ownerId, ownerName, text } })
    let commentIds = (await prisma.user.findUnique({ where: { id: ownerId } }))?.comments
    if (commentIds) {
        commentIds.push(comment.id)
    }
    await prisma.user.update({ where: { id: ownerId }, data: { comments: commentIds } })
    return comment
}

export async function editComment(commentId: number, text: string, likes: number[]) {
    return await prisma.comment.update({ data: { text, likes }, where: { id: commentId } })
}

export async function deleteComment(commentId: number, editedUserComments: number[], userId: number) {
    await prisma.user.update({ where: { id: userId }, data: { comments: editedUserComments } })
    return await prisma.comment.delete({ where: { id: commentId } })
}
