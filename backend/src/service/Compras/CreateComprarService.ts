import prismaClient from "../../prisma";
interface ComprarProps {
    titulo: string,
    descricao:string,
    dia_de_vencimento: string,
    parcelas: number,
    user_id: string
}
class CreateComprarService {
    async execute({
        titulo ,
        descricao,
        dia_de_vencimento,
        parcelas ,
        user_id 
    }:ComprarProps){

        if(!titulo || !dia_de_vencimento || !parcelas || !user_id){
            throw new Error('Não esqueça de preencher algumas informções')
        }


        const efetuado = await prismaClient.pagamento.create({
            data: {
                titulo ,
                descricao,
                dia_de_vencimento,
                parcelas,
                user_id  
            }
        })

        return efetuado
    }
}

export { CreateComprarService }