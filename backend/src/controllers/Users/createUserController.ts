import { Request, Response } from "express";

import { createUserService } from "../../service/User/createUserService";

class createUserController {
    async create(req: Request, res: Response){

        const inicializacao = new createUserService()

        if(!req.file){
            throw new Error('error no uploado de file')
        }else{
            const { originalname, filename: foto } = req.file
            const { nome, email, acesso, senha, data_de_nascimento } = req.body

            const user = await inicializacao.execute({
                foto,
                nome,
                email,
                acesso,
                senha,
                data_de_nascimento
            })
            return res.json(user)
        }
    }
}

export { createUserController }