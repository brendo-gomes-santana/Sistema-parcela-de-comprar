import { Router } from "express";
import multer from "multer";

import Api_key from "./middlewares/Api_Key";
import { storage } from "./config/multerConfig";

import { createUserController } from "./controllers/Users/createUserController";

const router = Router()

const uploads = multer({ storage: storage })

router.use(Api_key)
router.post('/create/user', uploads.single('foto') ,new createUserController().create)


export { router }