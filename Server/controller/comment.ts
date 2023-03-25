import { Request, Response } from "express";
import { VerifyToken } from "../database/Auth/token";
import { createComment, deleteComment, editComment, findCommentById } from "../database/Comment/comment";
import { editUser, getOneUserById } from "../database/user";

export async function getAllComments(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        if (token) {

        } else {
            return res.status(401).json({ message: "You must to login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function getCommentById(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { commentId } = req.body
        if (token && commentId) {
            const ValidateToken: any = VerifyToken(token)
            const comment = await findCommentById(+commentId)
            if (comment) {
                return res.status(200).json({ message: "All right", comment })
            } else {
                return res.status(404).json({ message: "Your comment is not exist!" })
            }
        } else {
            return res.status(401).json({ message: "You must to Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function addComment(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { ownerId, text } = req.body
        if (token && ownerId) {
            const user = await getOneUserById(+ownerId)
            if (user) {
                const createdComment = await createComment(user.id, user.name, text)
                return res.status(201).json({ message: "Comment creaeted succesfully", comment: createdComment })
            } else {
                return res.status(404).json({ message: "Your user is not exist!" })
            }
        } else {
            return res.status(401).json({ message: "You must to Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}
export async function editCommentById(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { userId, commentId, text }: { userId: number, commentId: number, text: string } = req.body
        if (token && userId && commentId && text) {
            VerifyToken(token)
            const user = await getOneUserById(+userId)
            const comment = await findCommentById(commentId)
            if (user && comment) {
                const editedComment = await editComment(comment.id, text, comment.likes)
                return res.status(200).json({ message: "Comment edited succesfully", comment: editedComment })
            } else {
                return res.status(404).json({ message: "You have some problems!" })
            }
        } else {
            return res.status(401).json({ message: "You must to login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function removeComment(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { userId, commentId }: { userId: number, commentId: number } = req.body
        if (token && userId && commentId) {
            const ValidateToken = VerifyToken(token)
            const user = await getOneUserById(+userId)
            const comment = await findCommentById(commentId)
            if (user && comment) {
                let editedCommenst = user.comments.filter((id: number) => { id !== comment.id })
                const userComments = (await editUser(
                    user.id,
                    user.name,
                    user.lastname,
                    user.phoneNumber,
                    user.lastMessage!,
                    user.lastMessageID!,
                    user.messages,
                    user.connectedChats,
                    user.password,
                    editedCommenst
                ))?.comments
                const deletedComment = await deleteComment(comment.id, userComments!, user.id)
                return res.status(200).json({ message: "Comment deleted succesfully", comment: deletedComment })
            } else {
                return res.status(404).json({ message: "You have some problems!" })
            }
        } else {
            return res.status(401).json({ message: "You must to login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}