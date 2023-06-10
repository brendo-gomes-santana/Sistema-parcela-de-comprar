import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
class EsqueceuSenhaService{
    async ParteI(email:string, data_de_nascimento:string){

        if(!email || !data_de_nascimento){
            throw new Error('Preenchar os campos')
        }

        const ExisteUser = await prismaClient.user.findFirst({
            where: {
                email,
                data_de_nascimento
            },
            select: {
                id: true,
                email: true,
                nome: true,
                senha: true,
            }
        })

        if(!ExisteUser){
            throw new Error('Não existe email/data no nosso sistema cadastrado')
        }

        return ExisteUser

    }

    async ParteII(codigo: string, NovaSenha: string, Confirmacao: string){

        const VerificandoSeSenhaExiste = await prismaClient.user.findFirst({
            where: {senha: codigo}
        })

        if(!VerificandoSeSenhaExiste){
            throw new Error('Codigo incorreto')
        }
        
        if(NovaSenha != Confirmacao){
            throw new Error('As duas senha não partem')
        }

        const SenhaNova = await prismaClient.user.update({
            where: { id: VerificandoSeSenhaExiste.id },
            data: {
                senha: await hash(Confirmacao, 10)
            },
            select: {
                id:true,
                nome:true,
                email:true
            }
        })
        
        return SenhaNova
    }
}

export { EsqueceuSenhaService }