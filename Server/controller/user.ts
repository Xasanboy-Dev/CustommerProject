import { Request, Response, text } from "express";
import { ComparePassword } from "../database/Auth/password";
import { SignToken, VerifyToken } from "../database/Auth/token";
import {
  addUser,
  editUser,
  getAllUsers,
  getOneUserById,
  getUserByPhoneNumber,
} from "../database/user";
import { editComment, findCommentById } from "../database/Comment/comment";

export async function getUsers(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const users = await getAllUsers();
      return res.status(200).json({ message: "All users", users });
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
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VerifyToken(token);
      const user = await getOneUserById(+id);
      if (user && ValidToken) {
        return res.status(200).json({ message: "Your user is not exist!" });
      } else {
        return res.status(404).json({ message: "User us not exist!" });
      }
    } else {
      return res.status(401).json({ message: "You must to Login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, lastname, phoneNumber, password } = req.body;
    if (name && lastname && phoneNumber && password) {
      const user = await getUserByPhoneNumber(phoneNumber);
      if (!user) {
        const createdUser = addUser(name, lastname, phoneNumber, password);
        return res.status(201).json({
          message: "User has created succesfully!",
          user: createdUser,
        });
      } else {
        return res.status(400).json({ message: "You have some problems!" });
      }
    } else {
      return res.status(401).json({ message: "Please fill all the gaps!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidateToken = VerifyToken(token);
      const user = await getOneUserById(+id);
      if (ValidateToken && user) {
        const {
          name,
          lastname,
          phoneNumber,
          lastMessage,
          lastMessageID,
          messages,
          connectedChats,
          password,
        } = req.body;
        const updatedUser = await editUser(
          user.id,
          name ? name : user.name,
          lastname ? lastMessage : user.lastname,
          phoneNumber ? phoneNumber : user.phoneNumber,
          lastMessage ? lastMessage : user.lastMessage,
          lastMessageID ? lastMessageID : user.lastMessageID,
          messages ? messages : user.messages,
          connectedChats ? connectedChats : user.connectedChats,
          password ? password : user.password,
          user.comments
        );
        return res
          .status(200)
          .json({ message: "Updated succesfully!", user: updateUser });
      } else {
        return res.status(401).json({ message: "You must to Login!" });
      }
    } else {
      return res.status(400).json({ message: "Yoiu have some probelms!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function LoginUer(req: Request, res: Response) {
  try {
    const { phoneNumber, password }: { phoneNumber: string; password: string } =
      req.body;
    if (phoneNumber && password) {
      const user = await getUserByPhoneNumber(phoneNumber);
      if (user) {
        if (await ComparePassword(password, user.password)) {
          let token = SignToken(
            user.id,
            user.name,
            user.lastname,
            user.phoneNumber,
            user.role,
            user.lastMessage!,
            user.lastMessageID!,
            user.messages,
            user.connectedCourses,
            user.connectedChats
          )
          return res.status(200).json({ message: "All right", user: token });
        } else {
          return res.status(400).json({ message: "You have some probelems!" });
        }
      } else {
        return res.status(404).json({ message: "User not found!" });
      }
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function checkTokenValid(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const ValiToken = VerifyToken(token);
      return res.status(200).json({ message: "All right", user: ValiToken });
    } else {
      return res.status(400).json({ message: "You must to send  token!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Intermal error" });
  }
}


export async function getCommentByUserId(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const { userID } = req.body
    if (token) {
      const ValidateToken = VerifyToken(token)
      const user = await getOneUserById(+userID)
      if (user) {
        const comments = await findCommentById(user.id)
        return res.status(200).json({ message: "All comments", comments })
      } else {
        return res.status(404).json({ message: "Your user is not exist!" })
      }
    } else {
      return res.status(401).json({ message: "You must to login!" })
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "Internal error" })
  }
}

export async function editCommentByUserId(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const { userId, commentId, text } = req.body
    if (token && userId && commentId && text) {
      const user = await getOneUserById(+userId)
      const comment = await findCommentById(+commentId)
      const ValidateToken = VerifyToken(token)
      if (user && comment) {
        const editedComment = await editComment(comment.id, text, comment.likes)
        return res.status(200).json({ message: "Comment edited succesfully", comment: editedComment })
      } else {
        return res.status(404).json({ message: "You have some problems!" })
      }
    } else {
      return res.status(401).json({ messahe: "Yoiu must to login!" })
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ message: "You must to login!" })
  }
}