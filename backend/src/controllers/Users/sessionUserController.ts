import { Request, Response } from "express";

import { sessionUserService } from "../../service/User/sessionUserService";

class sessionUserController {
    async handle(req: Request, res: Response){
        const { acesso, senha } = req.body

        const inicializacao = new sessionUserService()
        const login = await inicializacao.execute(acesso,senha)
        
        return res.json(login) 
    }
}

export { sessionUserController }