import { Router } from "express";
import {
    getAllUsers,
    getOneUserById,
    addUser
} from "../database/user";
const router = Router();

router.get("/all", getAllUsers)
router.get("/:id", getOneUserById)
router.post('/', addUser)


export default router