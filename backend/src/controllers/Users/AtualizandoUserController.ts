import { Request, Response } from "express";

import { AtualizandoUserService } from "../../service/User/AtulizandoUserSerive";

class AtualizandoUserController{
    async atulizando(req: Request, res: Response){

        const inicializando = new AtualizandoUserService()

        if(!req.file){
           return res.status(401).json({error: "Foto não carregada"})
        }else{
            const { nome, acesso, senha } = req.body
            const user_id = req.user_id as string
    
            const { originalname, filename: foto } = req.file
    
            
            const atualizado = await inicializando.execute({
                user_id,
                foto,
                nome,
                acesso,
                senha
            })
    
            return res.json(atualizado)
        }

    }   
}

export { AtualizandoUserController }