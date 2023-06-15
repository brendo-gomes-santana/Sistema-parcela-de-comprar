import { Request, Response } from "express";

import { RemoveUserService } from "../../service/User/RemoveUserService";

class RemoveUserController{
    async remove(req: Request, res: Response){

        const id_user = req.user_id as string

        const inicializacao = new RemoveUserService()
        const dados = await inicializacao.execute(id_user)

        return res.json(dados)
    }
}
export { RemoveUserController }