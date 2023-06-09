import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../contexts/Auth'
import { Link, useNavigate } from 'react-router-dom'

import { RiLockPasswordLine , RiUser3Line } from 'react-icons/ri'

import InputSenha from '../../components/InputSenha'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './style.scss'

export default function Login() {

  const navigate = useNavigate()

  const [verificado, setVerificado] = useState(true)

  const { Login, loagind } = useContext(AuthContext)
  const [acesso, setAcesso] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(()=> {
    (async () => {
      const taLogado = JSON.parse(localStorage.getItem("@user"))
      if(taLogado){
        navigate('/painel')
        setVerificado(false)
      }
      setVerificado(false)
    })()
  },[navigate])

  async function handleLogin(e){
    e.preventDefault()

    if(!acesso || !senha){
      alert('Preenchar todos os campos')
      return;
    }
    await Login(acesso, senha)
  }

  if(verificado){
    return(
      <div style={{
          position: 'fixed', 
          width: '100%',
          height: '100%',

          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
       }}>
         <span style={{color: 'var(--branco)'}}>Carregando...</span>
      </div>
    )
  }

  return (
    <>
    <main className='ContainerLogin'>
      <section className='BaseLogin'>
        <article className='baseDeImgLogin'>
          <h1>O controle Está com Você</h1>
        </article>
        <form className='formLogin' onSubmit={handleLogin}>
          <img src={require('../../imgs/logo.png')} alt="LogoDaEmpresa" className='Logo'/>
          <h1 style={{ color: 'var(--branco)', marginBottom: '1rem' }} >Faça seu Login</h1>
          <label>
            <RiUser3Line className='imgLogin'/> 
            <Input placeholder='Digite seu acesso' value={acesso} onChange={ v => setAcesso(v.target.value)}/>
          </label>
          <label>
            <RiLockPasswordLine className='imgLogin'/> 
            <InputSenha placeholder='Digite sua senha' value={senha} onChange={ v => setSenha(v.target.value)}/>
          </label>
          <Link to='/esqueceu_senha'>Esqueci minha senha</Link>
          <Link to='/cadastro'>Você não possuí controle? Crie sua conta</Link>
          <Button type='submit' disabled={loagind}>{loagind ? 'Carregando...' : 'Entrar'}</Button>
      </form>
      </section>
    </main>
    <Footer/>
    </>
  )
}
