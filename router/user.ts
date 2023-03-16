import { Router } from "express"
import { getUserData, postUser } from "../controller/user"
import { url } from "../src/server"

const router = Router()

router.get(`/`, getUserData)
router.post('/', postUser)
router.put('/:id',)


export default router