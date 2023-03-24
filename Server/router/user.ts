import { Router } from "express";
import {
  checkTokenValid,
  createUser,
  getUserById,
  getUsers,
  LoginUer,
  updateUser,
} from "../controller/user";
const router = Router();

router.get("/all", getUsers);
router.get("/token", checkTokenValid);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.post("/login", LoginUer);

export default router;
