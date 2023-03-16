import { Router } from "express";
import { getAllCourses, getOneCourse } from "../controller/course";
import { createCourse } from "./../controller/course";

const router = Router();

router.get("/all/", getAllCourses);
router.get("/:id", getOneCourse);
router.post("/", createCourse);
router.put("/");
router.delete("/");

export default router;
