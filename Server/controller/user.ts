import { user } from "@prisma/client";
import { Request, Response } from "express";
import {
  checkUserByPhoneNumber,
  checkUserExistById,
  createUser,
  updateUser,
} from "../database/user";
import { VerifyToken } from "./token";

export async function postUser(req: Request, res: Response) {
  try {
    const { name, lastname, phoneNumber, course } = req.body;
    if (!name || !lastname || !phoneNumber || !course) {
      return res.status(404).json({ message: "Your data is not exist!" });
    } else {
      const result = await checkUserByPhoneNumber(phoneNumber);
      if (result) {
        return res.status(404).json({ message: "This user is already exist" });
      } else {
        const user = await createUser(name, lastname, phoneNumber, course);
        return res
          .status(201)
          .json({ message: "User created succesfully!", user });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function Login(req: Request, res: Response) {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(404).json({ message: "Your data is not exist!" });
    } else {
      const user = await checkUserByPhoneNumber(phoneNumber);
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found!. Please try again later!" });
      } else {
        return res.status(200).json({ message: "User", user });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getUserData(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    const ValidToken = VerifyToken(token!);
    if (ValidToken) {
      return res.status(200).json({ message: "User", user: ValidToken });
    } else {
      return res.status(401).json({ message: "You must to Login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const token = req.header("x-key");
    if (!id || !token) {
      return res.status(404).json({ message: "User is not exist!" });
    } else {
      const tokenValid = VerifyToken(token);
      if (!tokenValid) {
        return res.status(401).json({ message: "You must to kogin!" });
      } else {
        if (Number(id).toString() !== "NaN") {
          const USER: user | null = await checkUserExistById(+id);
          if (USER) {
            const { name, lastname, phoneNumber, imageURL } = req.body;
            if (phoneNumber) {
              const user: user | null = await checkUserByPhoneNumber(
                phoneNumber
              );
              if (!user) {
                const result = await updateUser(
                  name ? name : USER.name,
                  lastname ? lastname : USER.lastname,
                  USER.number,
                  imageURL ? imageURL : USER.imageURL,
                  id
                );
                return res.status(200).json({
                  message: "Updated succesfully!",
                  user: {
                    name: result.name,
                    lastname: result.lastname,
                    phoneNumber: result.number,
                    imageURL: result.imageURL,
                  },
                });
              } else {
                return res
                  .status(409)
                  .json({ message: "You can't edit your phone number." });
              }
            } else {
              const result = await updateUser(
                name ? name : USER.name,
                lastname ? lastname : USER.lastname,
                USER.number,
                imageURL ? imageURL : USER.imageURL,
                id
              );
              return res.status(200).json({
                message: "Updated succesfully!",
                user: {
                  name: result.name,
                  lastname: result.lastname,
                  phoneNumber: result.number,
                  imageURL: result.imageURL,
                },
              });
            }
          } else {
            return res.status(404).json({ message: "User is not exist!" });
          }
        } else {
          return res.status(404).json({ message: "User is not exist!" });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
