import { Request, Response } from "express";
import { getAllAdmins } from "../database/admin";
import { VerifyToken } from "./../database/token"

export async function getAdminById(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        if (token) {
            const ValidateToken: any = VerifyToken(token)
            if (ValidateToken.role.includes("admin")) {
                const admins = await getAllAdmins()
                return res.status(200).json({ message: "All admins", admins })
            } else {
                return res.status(401).json({ message: "You must to Login!" })
            }
        } else {
            return res.status(401).json({ message: "Please Login!" })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(404).json({ message: "Internal error" })
    }
}