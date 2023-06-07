import { Request, Response } from "express";


import { InforCodigoUserService } from "../../service/User/InforCodigoUserService";

class InforCodigoUserController{
    async show(req: Request, res: Response){
        const codigo = req.query.codigo as string

        const inicializacao = new InforCodigoUserService()
        const dados = await inicializacao.execute(codigo)

        return res.json(dados)
    }
}

export { InforCodigoUserController }