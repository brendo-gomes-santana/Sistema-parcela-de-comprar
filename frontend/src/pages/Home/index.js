import React from 'react'

import { Link } from 'react-router-dom'

import { RiLockPasswordLine , RiUser3Line } from 'react-icons/ri'

import InputSenha from '../../components/InputSenha'
import Input from '../../components/Input'
import Button from '../../components/Button'

import './style.scss'

export default function Login() {
  return (
    <main className='ContainerLogin'>
      <section className='BaseLogin'>
        <article className='baseDeImgLogin'>
          <h1>O controle Está com Você</h1>
        </article>
        <form className='formLogin'>
          <img src={require('../../imgs/logo.png')} alt="LogoDaEmpresa" className='Logo'/>
          <h1 style={{ color: 'var(--branco)', marginBottom: '1rem' }} >Faça seu Login</h1>
          <label>
            <RiUser3Line className='imgLogin'/> 
            <Input placeholder='Digite seu acesso'/>
          </label>
          <label>
            <RiLockPasswordLine className='imgLogin'/> 
            <InputSenha placeholder='Digite sua senha'/>
          </label>
          <Link to='/esqueceu_senha'>Esqueci minha senha</Link>
          <Link to='/cadastro'>Você não possui conta? Crie a agora</Link>
          <Button type='submit' >Entrar</Button>
      </form>
      </section>
    </main>
  )
}
