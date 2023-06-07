import { Request, Response } from "express";
import { InforUserService } from "../../service/User/InforUserService";

class InforUserController {
    async show(req: Request, res: Response){

        const user_id = req.user_id

        const inicializacao = new InforUserService()
        const dados = await inicializacao.execute(user_id)

        return res.json(dados)
    }
}

export { InforUserController }