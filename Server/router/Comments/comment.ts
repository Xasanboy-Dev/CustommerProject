import { Router } from "express";
import { addComment, editCommentById, getAllComments, getCommentById, removeComment } from "../../controller/comment";
const router = Router()

router.get("/all", getAllComments)
router.get("/:id", getCommentById)
router.post('/', addComment)
router.put("/", editCommentById)
router.delete("/", removeComment)

export default router