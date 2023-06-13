import prismaClient from "../../prisma";

class InforUserService {
    async execute(user_id: string){
        if(!user_id){
            throw new Error('Informe o token')
        }

        const dados = await prismaClient.user.findFirst({
            where: { id: user_id }
        })

        return dados
    }
}

export { InforUserService }