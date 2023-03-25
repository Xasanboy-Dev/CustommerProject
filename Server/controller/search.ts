import { Request, Response } from "express";
import { VerifyToken } from "../database/Auth/token";
import { findSearchingPupils, findSearchingTeachers, findSearchingUsers } from "../database/Search/search";

export async function SearchUser(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { search } = req.body
        if (token && search) {
            const ValidToken = VerifyToken(token)
            const users = await findSearchingUsers(search)
            return res.status(200).json({ message: `Users where: ${search}`, users })
        } else {
            return res.status(401).json({ message: "You must to Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function SearchPupils(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { search } = req.body
        if (token && search) {
            const TokebValid = VerifyToken(token)
            const pupils = await findSearchingPupils(search)
            return res.status(200).json({ message: "Pupils", pupils })
        } else {
            return res.status(401).json({ message: "You must to Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function SearchTeachers(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { teachers } = req.body
        if (token && teachers) {
            const TokenValid = VerifyToken(token)
            const teacher = await findSearchingTeachers(teachers)
            return res.status(200).json({ message: "All teachers", teacher })
        } else {
            return res.status(401).json({ message: "You must to Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}