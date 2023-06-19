import { Request, Response } from "express";

import { createUserService } from "../../service/User/createUserService";

class createUserController {
    async create(req: Request, res: Response){
    
        const inicializacao = new createUserService()
            const { nome, email, acesso, senha, data_de_nascimento } = req.body

            const user = await inicializacao.execute({
                nome,
                email,
                acesso,
                senha,
                data_de_nascimento
            }) 
            return res.json(user)
    }
}

export { createUserController }