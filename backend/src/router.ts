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
import { AtualizandoUserController } from "./controllers/Users/AtualizandoUserController";
import { RemoveUserController } from "./controllers/Users/RemoveUserController";

import { CreateComprarController } from "./controllers/Compras/CreateComprarController";
import { PagamentoComprarController } from "./controllers/Compras/PagamentoComprarController";
import { ListaComprarController } from "./controllers/Compras/ListaComprarController";
import { RemoveComprarController } from "./controllers/Compras/RemoveComprarController";

const router = Router()

const uploads = multer({ storage: storage })

router.use(Api_key)
router.post('/create/user', new createUserController().create)
router.post('/session', new sessionUserController().handle)

router.post('/esqueceu', new EsqueceuSenhaUserController().show)
router.patch('/esqueceu', new EsqueceuSenhaUserController().trocar)
router.get('/infor', new InforCodigoUserController().show)

router.use(Auth)
router.get('/user', new InforUserController().show)
router.patch('/user/atualizando', uploads.single('foto'), new AtualizandoUserController().atulizando)
router.delete('/user/remove', new RemoveUserController().remove)

//ROTAS DE PAGAMENTOS
router.post('/create/pagamento', new CreateComprarController().handle)
router.patch('/pagamento', new PagamentoComprarController().handle)
router.get('/lista/pagamento', new ListaComprarController().show)
router.delete('/remove/pagamento', new RemoveComprarController().remove)

export { router }