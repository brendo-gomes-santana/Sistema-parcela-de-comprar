import prismaClient from "../../prisma";

class RemoveUserService{
    async execute(id_user: string){

        if(!id_user){
            throw new Error('Informe o usuário')
        }

        await prismaClient.pagamento.deleteMany({
            where: { user_id: id_user }
        })

        await prismaClient.user.deleteMany({
            where: { id: id_user }
        })

        return { mensage: 'Conta Excluida com sucesso' }
    }
}

export { RemoveUserService }