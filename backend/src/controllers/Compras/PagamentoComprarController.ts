import { Request, Response } from "express";
import { PagamentoComprarService } from "../../service/Compras/PagamentoComprarService";


class PagamentoComprarController{
    async handle(req: Request, res: Response){
        const id_pagamento = req.query.id_pagamento as string


        const inicializacao = new PagamentoComprarService()
        const atualizado = await inicializacao.execute(id_pagamento)

        return res.json(atualizado)
    }
}

export { PagamentoComprarController }