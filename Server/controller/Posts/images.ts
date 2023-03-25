import { Request, Response } from "express";

export async function postImage(req: Request, res: Response) {
  try {
    const token = req.headers.age
    const userID = req.headers.accept
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal error" })
  }
}