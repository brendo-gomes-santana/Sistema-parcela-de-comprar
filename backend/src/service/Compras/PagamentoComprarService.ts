import prismaClient from "../../prisma";


class PagamentoComprarService{
    async execute(id_pagamento:string){
        const dados = await prismaClient.pagamento.findFirst({
            where: { id: id_pagamento}
        })
        if(!dados){
            throw new Error('Não existe esse item')
        }
        
        const atualizando = await prismaClient.pagamento.update({
            where: { id: id_pagamento },
            data: {
                parcelas: dados?.parcelas as number - 1
            }
        })

        if(atualizando.parcelas === 0){
            await prismaClient.pagamento.delete({
                where: {id: id_pagamento}
            })
            return { mensagem: 'Você terminou de pagar' }
        }

        return atualizando
    }
}

export { PagamentoComprarService }