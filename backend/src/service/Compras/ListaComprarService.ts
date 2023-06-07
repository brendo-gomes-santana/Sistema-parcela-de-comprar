import prismaClient from "../../prisma";

class ListaComprarService{
    async execute(id_user: string){
        const lista = await prismaClient.pagamento.findMany({
            where: { user_id: id_user }
        }) 


        return lista
    }
}

export { ListaComprarService }