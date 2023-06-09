import prismaClient from "../../prisma";
interface ComprarProps {
    titulo: string,
    descricao:string,
    dia_de_vencimento: string,
    parcelas: number,
    valor: string,
    user_id: string
}
class CreateComprarService {
    async execute({
        titulo ,
        descricao,
        dia_de_vencimento,
        parcelas,
        valor,
        user_id 
    }:ComprarProps){

        if(!titulo || !dia_de_vencimento || !parcelas || !user_id || !valor){
            throw new Error('Não esqueça de preencher algumas informções')
        }


        const efetuado = await prismaClient.pagamento.create({
            data: {
                titulo ,
                descricao,
                dia_de_vencimento,
                parcelas,
                valor,
                user_id  
            }
        })

        return efetuado
    }
}

export { CreateComprarService }