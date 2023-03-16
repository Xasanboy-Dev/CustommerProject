import { Router } from "express";
import { editUser, getUserData, Login, postUser } from "../controller/user";

const router = Router();

router.get("/", getUserData);
router.post("/", postUser);
router.post("/login/", Login);

router.put("/:id", editUser);

export default router;
