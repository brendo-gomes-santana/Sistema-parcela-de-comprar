import { Request, Response } from "express";
import { RemoveComprarService } from "../../service/Compras/RemoveComprarService";

class RemoveComprarController{
    async remove(req: Request, res: Response){

        const id_pagamento = req.query.id_pagamento as string

        const inicializacao = new RemoveComprarService()
        const Removido = await inicializacao.execute(id_pagamento)
        
        return res.json(Removido)
    }
}

export { RemoveComprarController }