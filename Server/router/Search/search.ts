import { Router } from "express";
import { SearchTeachers, SearchUser } from "../../controller/search";
const router = Router()

router.post('/', SearchUser)
router.post('/pupils', SearchUser)
router.post('/teachers', SearchTeachers)

export default router