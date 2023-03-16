import { admin } from "@prisma/client";
import { Request, Response } from "express";
import {
  addAdmin,
  checkAdminExistByID,
  checkAdminExistByNumber,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
  updateUserData,
} from "../database/admin";
import {
  checkUserByPhoneNumber,
  checkUserExistById,
} from "../database/user";
import { Sign, VerifyToken } from "./token";

export async function getAdmin(req: Request, res: Response) {
  try {
    const { number } = req.params;
    if (number) {
      const Validnumber = await checkAdminExistByNumber(number);
      if (Validnumber) {
        res.status(200).json({ message: "Admin", admin: Validnumber });
      } else {
        return res.status(404).json({ message: "Admin not exist!" });
      }
    } else {
      return res.status(404).json({ message: "Admin not exist!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createAdmin(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    const secretKey = req.header("data");
    const { currentAdminID, name, lastname, phoneNumber, imageURL } = req.body;
    if (!name || !lastname || !phoneNumber || !currentAdminID) {
      return res.status(404).json({ message: "Please fill all the gaps!" });
    }
    if (secretKey) {
      const createdAdmin: admin = await addAdmin(
        name,
        lastname,
        phoneNumber,
        imageURL
      );
      return res.status(201).json({
        message: "Admin has created!",
        admin: createdAdmin,
      });
    } else {
      const Token = VerifyToken(token!);
      if (Token) {
        const admin = await checkAdminExistByID(+currentAdminID);
        if (admin) {
          const createdAdmin: admin = await addAdmin(
            name,
            lastname,
            phoneNumber,
            imageURL
          );
          return res.status(201).json({
            message: "Admin has created!",
            admin: createdAdmin,
          });
        } else {
          return res.status(404).json({ message: "Admin is not exist!" });
        }
      } else {
        return res.status(404).json({ message: "Admin is not exist!" });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editAdminData(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidToken = VerifyToken(token);
      if (ValidToken) {
        const { name, lastname, phoneNumber, AdminID } = req.body;
        if (!AdminID) {
          return res.status(404).json({ message: "Your admin is not exist!" });
        } else {
          const Admin = await checkAdminExistByID(AdminID);
          if (Admin) {
            const ValidNumber = await checkAdminExistByNumber(phoneNumber);
            if (!ValidNumber) {
              const updatedAdmin = await updateAdmin(
                name,
                lastname,
                phoneNumber,
                Admin.id
              );
              return res
                .status(200)
                .json({ message: "Updated admin!", admin: updatedAdmin });
            } else {
              return res
                .status(409)
                .json({ message: "Your user number is already exist!" });
            }
          } else {
            return res
              .status(404)
              .json({ message: "Your admin is not exist!" });
          }
        }
      } else {
        return res.status(401).json({ message: "You must to login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function removeAdmin(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    const ValidToken = VerifyToken(token!);
    if (ValidToken) {
      const { id } = req.params;
      if (Number(id).toString() !== "NaN") {
        const admin = await checkAdminExistByID(+id);
        if (admin) {
          const deletedAdmin = await deleteAdmin(admin.id, admin.imageURL);
          return res
            .status(200)
            .json({ message: "Admin has deleted succesfully!", deletedAdmin });
        } else {
          return res.status(401).json({ messaeg: "Admin not exist!" });
        }
      } else {
        return res.status(401).json({ messaeg: "You must to login!" });
      }
    } else {
      return res.status(401).json({ messaeg: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function Login(req: Request, res: Response) {
  try {
    const { phoneNumber } = req.body;
    if (phoneNumber) {
      const admin = await checkAdminExistByNumber(phoneNumber);
      if (!admin) {
        return res.status(404).json({ message: "You have some probelms!" });
      } else {
        const token = Sign(admin.name, admin.lastname, admin.phoneNumber);
        return res.status(200).json({ message: "Admin", token, admin });
      }
    } else {
      return res.status(404).json({ message: "You have some probelms!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function findAllAdmin(req: Request, res: Response) {
  try {
    const { token } = req.params;
    if (token) {
      const validToken: any = VerifyToken(token);
      if (validToken) {
        const admins = await getAllAdmins();
        return res.status(200).json({ message: "All admins", admins });
      } else {
        return res.status(401).json({ message: "You must to login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function editUserDataByAdmin(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    const { userID } = req.params;
    if (token) {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        const user = await checkUserExistById(+userID);
        if (!user) {
          return res
            .status(409)
            .json({ message: "Pplease check your users's id!" });
        } else {
          const { name, lastname, phoneNumber, imageURL, course, role } =
            req.body;
          let number: any;
          if (phoneNumber) {
            let exist = await checkUserByPhoneNumber(phoneNumber);
            if (exist) {
              return res
                .status(409)
                .json({ message: "Your phone number is already exist!" });
            } else {
              number = phoneNumber;
            }
          }
          const updatedUser = await updateUserData(
            name ? name : user.name,
            lastname ? lastname : user.lastname,
            number ? number : user.number,
            imageURL ? imageURL : user.imageURL,
            user.id,
            course ? course : user.course,
          );
          return res
            .status(200)
            .json({ message: "Updated sucesfully!", user: updatedUser });
        }
      } else {
        return res.status(401).json({ message: "You must to login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}