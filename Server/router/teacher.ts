import { Request, Response } from "express";
import { VerifyToken } from "../controller/token";
import {
  addTeacher,
  editTeacherData,
  findAllTeachers,
  findTeacherById,
  findTeacherExistNumber,
} from "../database/teacher";
import { checkUserByPhoneNumber } from "../database/user";

export async function getTeacherById(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        console.log(ValidateToken);
      } else {
        return res.status(401).json({ message: "You must to Login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to Login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "Internal error" });
  }
}

export async function getAllTeachers(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        const allTeachers = await findAllTeachers();
        return res
          .status(200)
          .json({ message: "All Teachers", teachers: allTeachers });
      } else {
        return res.status(500).json({ message: "You must to login!" });
      }
    } else {
      return res.status(500).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createTeacher(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        const { name, lastname, phoneNumber, email, lengtWork } = req.body;
        if (!name || !lastname || !phoneNumber) {
          return res.status(404).json({ message: "Please fill all the gaps" });
        } else {
          const Teacher = await findTeacherExistNumber(phoneNumber);
          if (Teacher) {
            return res
              .status(409)
              .json({ message: "You have already registered!" });
          } else {
            const createdTeacher = await addTeacher(
              name,
              phoneNumber,
              lastname,
              email ? email : "",
              lengtWork ? lengtWork : "Junior"
            );
            return res.status(201).json({
              message: "Teacher created succesfully!",
              teacher: createdTeacher,
            });
          }
        }
      } else {
        return res.status(500).json({ message: "You must to login!" });
      }
    } else {
      return res.status(500).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
export async function editTeacher(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidToken = VerifyToken(token);
      if (ValidToken) {
        const { teacherID, name, lastname, phoneNumber, email } = req.body;
        if (teacherID) {
          const teacherExist = await findTeacherById(teacherID);
          if (teacherExist) {
            const updatedTeacher = editTeacherData(
              teacherExist.id,
              name ? name : teacherExist.name,
              phoneNumber ? phoneNumber : teacherExist.phoneNumber,
              lastname ? lastname : teacherExist.lastname,
              email ? email : ""
            );
            return res
              .status(200)
              .json({ message: "Teacher updated sucesfully!" });
          } else {
            return res
              .status(404)
              .json({ message: `Teacher is not exist with Id:${teacherID}` });
          }
        } else {
          return res
            .status(404)
            .json({ message: `Teacher is not exist with Id:${teacherID}` });
        }
      } else {
        return res.status(401).json({ message: "Yuo must to login!" });
      }
    } else {
      return res.status(401).json({ message: "Yuo must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
export async function removeTeacher(req: Request, res: Response) {
  try {
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
