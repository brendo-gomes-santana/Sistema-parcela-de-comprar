import { Request, Response } from "express";
import { CreateComprarService } from "../../service/Compras/CreateComprarService";


class CreateComprarController {
    async handle(req: Request, res: Response){

        const user_id = req.user_id as string
        const { titulo, descricao, parcelas, dia_de_vencimento } = req.body

        const inicializacao = new CreateComprarService()
        const cadastrado = await inicializacao.execute({
            titulo,
            descricao,
            dia_de_vencimento,
            parcelas,
            user_id
        })

        return res.json(cadastrado)
    }
}

export { CreateComprarController }