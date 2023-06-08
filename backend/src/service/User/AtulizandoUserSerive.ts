import prismaClient from "../../prisma";



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
                foto,
                nome,
                acesso,
                senha
            }
        })

        return atualizado

    }
}

export { AtualizandoUserService }