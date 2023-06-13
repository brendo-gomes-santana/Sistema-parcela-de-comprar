import prismaClient from "../../prisma";

import { hash } from "bcryptjs";

interface AtulizarInforUserProps { 
    user_id: string,

    foto: string,
    
    nome: string,

    acesso: string,
    senha: string

 }

class AtualizandoUserService{
    async execute({ user_id, foto, nome, acesso, senha}: AtulizarInforUserProps){
        
        const existe = await prismaClient.user.findFirst({
            where: { id: user_id }
        })
        if(!existe){
            throw new Error('Usuário não existe')
        }

        const atualizado = await prismaClient.user.update({
            where: { id: user_id },
            data: {
                foto: foto? foto : undefined,
                nome,
                acesso,
                senha: senha && await hash(senha,10)
            }
        })

        return atualizado

    }
}

export { AtualizandoUserService }