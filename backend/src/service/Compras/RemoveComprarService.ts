import prismaClient from "../../prisma";

class RemoveComprarService{
    async execute(id_pagamento: string){
        const existe = await prismaClient.pagamento.findFirst({
            where: { id: id_pagamento }
        })

        if(!existe){
            throw new Error('Não existe item')
        }

        await prismaClient.pagamento.delete({
            where: { id: id_pagamento }
        })

        try{
            return { mensagem: "item removido com sucesso" }
        }catch{
            throw new Error('Algo deu errado')
        }
    }
}

export { RemoveComprarService }