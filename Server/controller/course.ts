import { Request, Response } from "express";
import { checkAdminExistByID } from "../database/admin";
import { addCourse, findAllCourse, findOneCourse } from "../database/course";
import { VerifyToken } from "./token";

export async function getOneCourse(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (token) {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        const { id } = req.params;
        if (!id) {
          return res
            .status(404)
            .json({ message: "You must to select Course!" });
        } else {
          const course = await findOneCourse(+id);
          if (course) {
            return res
              .status(200)
              .json({ message: `Your selected course: ${id}`, course });
          } else {
            return res
              .status(404)
              .json({ message: "Course not found. Please try again later!" });
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
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    if (!token) {
      return res.status(401).json({ message: "You must to login!" });
    } else {
      const ValidateToken = VerifyToken(token);
      if (ValidateToken) {
        const allCourses = await findAllCourse();
        res.status(200).json({ message: "All courses", courses: allCourses });
      } else {
        return res.status(401).json({ message: "You must to login!" });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const token = req.header("x-key");
    const id = req.header("ID");
    if (!token || !id) {
      return res.status(401).json({ message: "You must to login!" });
    } else {
      if (Number(id).toString() == "NaN") {
        return res.status(401).json({ message: "You must to login!" });
      } else {
        const ValidatedToken = VerifyToken(token);
        if (ValidatedToken) {
          const admin = await checkAdminExistByID(+id);
          if (!admin) {
            return res.status(401).json({ message: "You must to login!" });
          } else {
            const { name, teacherID, pupils, imageURL } = req.body;
            if (!name || !teacherID || !pupils) {
              return res
                .status(404)
                .json({ message: "You must to write all data!" });
            } else {
              const addedCourse = await addCourse(imageURL?imageURL:"",name,teacherID);
            }
          }
        } else {
          return res.status(401).json({ message: "You must to login!" });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
