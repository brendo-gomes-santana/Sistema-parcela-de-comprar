import { Request, Response } from "express";


import { EsqueceuSenhaService } from "../../service/User/EsqueceuSenhaService";
class EsqueceuSenhaUserController {
    async show(req: Request, res: Response){

        const { data_de_nascimento, email } = req.body
        const inicializacao = new EsqueceuSenhaService()
        const navegar = await inicializacao.ParteI(email, data_de_nascimento)

        return res.json(navegar)
    }
    async trocar(req: Request, res:Response){
        const { codigo, NovaSenha, Confirmacao } = req.body
        const inicializacao = new EsqueceuSenhaService()
        const SenhaTrocada = await inicializacao.ParteII(codigo, NovaSenha, Confirmacao)

        return res.json(SenhaTrocada)
    }
}

export { EsqueceuSenhaUserController }