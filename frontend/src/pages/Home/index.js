import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import ShowSlide from '../../components/ShowSlide'
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
    <main>
        <header className={styles.header}>
            <img src={require('../../imgs/logo.png')} alt="logo" />
            <h1>Controle de parcelas</h1>
            <nav>
                <Link to='/login'>{Infor}</Link>
            </nav>
        </header>
            <ShowSlide/>
            <section>

            </section>
    </main>
  )
}
