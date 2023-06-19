import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import  api  from '../../service/Api'

import Input from '../../components/Input';
import Button from '../../components/Button';
import InputSenha from '../../components/InputSenha';

import './style.scss'

export default function Cadastro() {

    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [acesso, setAcesso] = useState('')
    const [email, setEamil] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState('')

    const [loading, setLoading] = useState(false)
    async function handleCadastro(e) {
        e.preventDefault();

        if (!nome || !acesso || !email || !senha || !data) {
            alert('Preencha todas as informações');
            return;
        }
        setLoading(true)
        await api.post('/create/user', {
            nome,
            email,
            acesso,
            senha,
            data_de_nascimento: data
        })
        .then(() => {
            navigate('/');
            setLoading(false)
        })
        .catch((error) => {
            console.error(error);
            alert('Erro ao cadastrar usuário');
            setLoading(false)

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
            <Button type='submit' disabled={loading}>{loading ? 'Carregando...' : 'Cadastrar'}</Button>
        </form>
    </main>
  )
}
