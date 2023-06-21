import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import ShowSlide from '../../components/ShowSlide'

import { VscSourceControl } from 'react-icons/vsc'
import { FaLaptop } from 'react-icons/fa'

export default function Home() {

    const [Infor, setInfor] = useState('')

    useEffect(()=> {
        const dados = JSON.parse(localStorage.getItem('@user'))
        if(!dados){
            setInfor('Faça login')
            return;
        }
        setInfor(`Painel - ${dados.nome}`)
    },[])
    
  return (
    <main className={styles.container}>
        <header className={styles.header}>
            <img src={require('../../imgs/logo.png')} alt="logo" />
            <h1>Controle de parcelas</h1>
            <nav>
                <Link to='/login'>{Infor}</Link>
            </nav>
        </header>
        <ShowSlide/>
        <h2 style={{color: 'var(--branco)', textAlign: 'center', margin: '1rem 0'}}>Qual serviço oferecemos?</h2>
        <section className={styles.Informacao}>
           <article className={styles.card}>
                <p className={styles.titulo}>Controle</p>
                <VscSourceControl className={styles.imgServico}/>
                <p>Aqui você tem o controle total do que falta pagar no seus produto.</p>
           </article>
           <article className={styles.card}>
                <p className={styles.titulo}>Fácil uso</p>
                <FaLaptop className={styles.imgServico}/>
                <p>O site é bastante simples de utilizar, você consegue encontrar as funcionalidade de forma simples.</p>
           </article> 
        </section>
    </main>
  )
}
