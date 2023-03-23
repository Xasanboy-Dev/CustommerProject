import { Request, Response } from "express";
import { removeMessageWithId } from "../database/message";
import { VerifyToken } from "../database/token";
import { addUser, editUser, getAllUsers, getOneUserById, getUserByPhoneNumber } from "../database/user";

export async function getUsers(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const users = await getAllUsers()
      return res.status(200).json({ message: "All users", users })
    } else {
      return res.status(404).json({ message: "You must to Login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const { id } = req.params
    if (token && id) {
      const ValidToken = VerifyToken(token)
      const user = await getOneUserById(+id)
      if (user && ValidToken) {
        return res.status(200).json({ message: "Your user is not exist!" })
      } else {
        return res.status(404).json({ message: "User us not exist!" })
      }
    } else {
      return res.status(401).json({ message: "You must to Login!" })
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal error" })
  }
}


export async function createUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const
      { name,
        lastname,
        phoneNumber,
        password
      } = req.body
    if (token && name && lastname && phoneNumber && password) {
      const ValidateToken = VerifyToken(token)
      const user = await getUserByPhoneNumber(phoneNumber)
      if (ValidateToken && !user) {
        const createdUser = addUser(name, lastname, phoneNumber, password)
        return res.status(201).json({ message: "User has created succesfully!", user: createdUser })
      } else {
        return res.status(400).json({ message: "You have some problems!" })
      }
    } else {
      return res.status(401).json({ message: "Please fill all the gaps!" })
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal error" })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const { id } = req.params
    if (token && id) {
      const ValidateToken = VerifyToken(token)
      const user = await getOneUserById(+id)
      if (ValidateToken && user) {
        const { name, lastname, phoneNumber, lastMessage, lastMessageID, messages, connectedChats, password } = req.body
        const updatedUser = await editUser(
          user.id,
          name ? name : user.name,
          lastname ? lastMessage : user.lastname,
          phoneNumber ? phoneNumber : user.phoneNumber,
          lastMessage ? lastMessage : user.lastMessage,
          lastMessageID ? lastMessageID : user.lastMessageID,
          messages ? messages : user.messages,
          connectedChats ? connectedChats : user.connectedChats,
          password ? password : user.password
        )
        return res.status(200).json({ message: "Updated succesfully!", user: updateUser })
      } else {
        return res.status(401).json({ message: "You must to Login!" })
      }
    } else {
      return res.status(400).json({ message: "Yoiu have some probelms!" })
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal error" })
  }
}