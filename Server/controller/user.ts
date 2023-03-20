import { Request, Response } from "express";

export async function getUsers(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
       
    } else {
      return res.status(404).json({ message: "You must to Login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
