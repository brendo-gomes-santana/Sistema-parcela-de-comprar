import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface CreateUserProps{
    nome: string,
    data_de_nascimento: string,
    
    email: string,

    acesso: string,
    senha: string
}

class createUserService{
    async execute({
        nome,
        data_de_nascimento,
        email,
        acesso,
        senha
    }: CreateUserProps){


        if(!nome || !data_de_nascimento || !email
            || !acesso || !senha){
                throw new Error('Preenchar todas as informações')
            }

        const user = await prismaClient.user.findFirst({
            where: { email }
        })

        if(user){
            throw new Error('usuário já existe')
        }

        const create = await prismaClient.user.create({
            data: {
                nome,
                data_de_nascimento,
                email,
                acesso,
                senha: await hash(senha, 10)
            },select: {
             id: true,
             nome:true,  
            }
        })

        return create
    }
}

export { createUserService }