import { Router } from "express";
import multer from "multer";

import Api_key from "./middlewares/Api_Key";
import Auth from "./middlewares/Auth";
import { storage } from "./config/multerConfig";

import { createUserController } from "./controllers/Users/createUserController";
import { sessionUserController } from "./controllers/Users/sessionUserController";
import { InforUserController } from "./controllers/Users/InforUserController";
import { EsqueceuSenhaUserController } from "./controllers/Users/EsqueceuSenhaUserController";
import { InforCodigoUserController } from "./controllers/Users/InforCodigoUserController";

import { CreateComprarController } from "./controllers/Compras/CreateComprarController";
import { PagamentoComprarController } from "./controllers/Compras/PagamentoComprarController";
import { ListaComprarController } from "./controllers/Compras/ListaComprarController";

const router = Router()

const uploads = multer({ storage: storage })

router.use(Api_key)
router.post('/create/user', uploads.single('foto') ,new createUserController().create)
router.post('/session', new sessionUserController().handle)

router.get('/esqueceu', new EsqueceuSenhaUserController().show)
router.patch('/esqueceu', new EsqueceuSenhaUserController().trocar)
router.get('/infor', new InforCodigoUserController().show)

router.use(Auth)
router.get('/user', new InforUserController().show)


//ROTAS DE PAGAMENTOS
router.post('/create/pagamento', new CreateComprarController().handle)
router.patch('/pagamento', new PagamentoComprarController().handle)
router.get('/lista/pagamento', new ListaComprarController().show)

export { router }