import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import  api  from '../../service/Api'

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputSenha from '../../components/InputSenha';

import './style.scss'

import fotouser from '../../imgs/user.jpg'

import { Conversor } from '../../service/ConversorDeIMG';

export default function Cadastro() {

    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [acesso, setAcesso] = useState('')
    const [email, setEamil] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState('')

    async function handleCadastro(e) {
        e.preventDefault();

        if (!nome || !acesso || !email || !senha || !data) {
            alert('Preencha todas as informações');
            return;
        }

        const foto = await Conversor(fotouser);

        const formData = new FormData();

        formData.append('foto', foto);
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('acesso', acesso);
        formData.append('senha', senha);
        formData.append('data_de_nascimento', data);

        await api.post('/create/user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            console.error(error);
            alert('Erro ao cadastrar usuário');
        });
    }
  return (
    <main className='ContainerCadastro'>
        <img src={require('../../imgs/logo.png')} alt="Logo" />
        <h1>Faça sua conta</h1>
        <form className='formCadastro' onSubmit={handleCadastro}>
            <Input  placeholder='Digite seu nome completo' style={{marginBottom: '1rem'}}
            value={nome} onChange={ v => setNome(v.target.value)}/>

            <Input placeholder='Digite o seu login' style={{marginBottom: '1rem'}}
            value={acesso} onChange={ v => setAcesso(v.target.value)}/>

            <Input type='email' placeholder='Digite o email de recuperação de conta' style={{marginBottom: '1rem'}}
            value={email} onChange={ v => setEamil(v.target.value)}/>

            <InputSenha placeholder='Digite sua senha'
            value={senha} onChange={ v => setSenha(v.target.value)}/>

            <Input type='date' style={{margin: '1rem 0'}}
            value={data} onChange={ v => setData(v.target.value) }/>
            
            <Link to='/'>Você já possui conta? Faça login agora</Link>

            <Button type='submit'>Cadastrar</Button>
        </form>
    </main>
  )
}
