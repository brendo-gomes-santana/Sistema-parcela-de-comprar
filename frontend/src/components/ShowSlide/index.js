import React from 'react'
import { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../imgs/slide1.png'
import img2 from '../../imgs/slide2.png'
import img3 from '../../imgs/slide3.png'
import img4 from '../../imgs/slide4.png'


//importando o scss swiper
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

import styles from './styles.module.scss'

export default function ShowSlide() {

    const slides = [
        {id: 1, imagem: img1, descricao: 'Bem-vindo ao seu painel de controle personalizado! Aqui, você pode ter um controle total sobre todas as suas compras cadastradas. '},
        {id: 2, imagem: img2, descricao: 'Gerenciamento de Parcelas: Acompanhe suas compras e pagamentos de forma eficiente'},
        {id: 3, imagem: img3, descricao: 'Cadastre suas compras de forma rapido e prático.'},
        {id: 4, imagem: img4, descricao: 'Gerenciamento de Dados: Acesse e atualize suas informações de forma simples e rápida'},
    ]

  return (
    <Swiper
    modules={[ Pagination, Autoplay]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    slidesPerView={1}
    pagination={{ clickable: true }}

    className={styles.containerSlides}
    >
        { slides.map((slide) => (
            <SwiperSlide key={slide.id} className={styles.box}>
                <img src={slide.imagem} alt="imagem" className={styles.showImg}/>
                <h2>{slide.descricao}</h2>
            </SwiperSlide>
        )) }
    </Swiper>
  )
}
