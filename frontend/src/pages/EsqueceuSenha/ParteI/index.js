import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

import Input from '../../../components/Input'
import Button from '../../../components/Button'

import Api from '../../../service/Api'

import './style.scss'

export default function EsqueceuSenhaParteI() {

    const [carregando, setCarregando] = useState(true)
    const [datas, setData] = useState('')
    const [email, setEmail] = useState('')

    async function handlerecuperarConta(e){
        e.preventDefault()
        if(!datas || !email){
            alert('Prenchar as informações')
            return
        }
        setCarregando(false)

        try {
            const r = await Api.post('/esqueceu', {
                data_de_nascimento: datas,
                email: email
            })
            console.log(r.data)
            let mensagem = {
                codigo: r.data.senha,
                URL_da_pagina: 'irei criar',
                email_do_usuario: r.data.email
            }
            emailjs.send("service_0ekaqpf", "template_rlbqot1", mensagem, "B0scmubYGpapyzKbO")
            .then((r)=> {
                console.log(r)
                console.log('enviando')
                setCarregando(undefined)
            })


            } catch (error) {
            console.error(error.response.data);
            setCarregando(true)
        }
    }
    return (
        <main className='ContainerEsqueceuSenhaParteI'>
            <img src={require('../../../imgs/logo.png')} alt='logo'/>
            <h1>Recupere sua Conta</h1>
            {carregando && (
                <form className='box' onSubmit={handlerecuperarConta}>
                    <Input type='date' value={datas} onChange={ v => setData(v.target.value)}/>
                    <Input type='email' placeholder='Digite seu email de recuperação '
                    value={email} onChange={ v => setEmail(v.target.value)}/>
                    <Button type='submit'>Enviar</Button>
                </form>
            )}
            {!carregando && (
                <section className='box'>
                    <h1>{carregando === undefined ? 'Verificar seu email' : 'Carregando...'}</h1>
                </section>
            )}
        </main>
    )
}
