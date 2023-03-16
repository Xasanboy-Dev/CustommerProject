import { Router } from "express";
import {
  createAdmin,
  editAdminData,
  getAdmin,
  removeAdmin,
  Login,
  findAllAdmin,
} from "../controller/admin";

const router = Router();

router.get("/login/:number", getAdmin);
router.post("/", createAdmin);
router.put("/", editAdminData);
router.delete("/:id", removeAdmin);
router.post("/login/", Login);
router.get("/AllAdmin/:token", findAllAdmin);

export default router;
