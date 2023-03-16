import { Request, Response } from "express";
import { checkUserByPhoneNumber, createUser } from "../database/user";

export async function postUser(req: Request, res: Response) {
    try {
        const { name, latsname, phoneNumber, course } = req.body
        if (!name || !latsname || !phoneNumber || !course) {
            return res.status(404).json({ message: "Your data is not exist!" })
        } else {
            const result = await checkUserByPhoneNumber(phoneNumber)
            if (result) {
                return res.status(404).json({ message: "This user is already exist" })
            } else {
                const user = await createUser(name, latsname, phoneNumber, course)
                return res.status(201).json({ message: "User created succesfully!", user })
            }
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function Login(req: Request, res: Response) {
    try {
        const { phoneNumber } = req.body
        if (!phoneNumber) {
            return res.status(404).json({ message: "Your data is not exist!" })
        } else {
            const user = await checkUserByPhoneNumber(phoneNumber)
            if (!user) {
                return res.status(404).json({ message: "User not found!. Please try again later!" })
            } else {
                return res.status(200).json({ message: "User", user })
            }
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}


export async function getUserData(req: Request, res: Response) {
    try {
        const { token } = req.body
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Internal error" })
    }
}

export async function editUser(req:Request,res:Response){
    try {
        
    } catch (error:any) {
        console.log(error.message)
    }
}