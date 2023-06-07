import { Request, Response } from "express";
import { ListaComprarService } from "../../service/Compras/ListaComprarService";

class ListaComprarController {
    async show(req: Request, res: Response){
        const user_id = req.user_id as string

        const inicializacao = new ListaComprarService()
        const lista = await inicializacao.execute(user_id)

        return res.json(lista)
    }
}

export { ListaComprarController }