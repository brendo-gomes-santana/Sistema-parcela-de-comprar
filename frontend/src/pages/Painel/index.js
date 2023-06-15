import React, { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import Header from '../../components/Header'
import Model from '../../components/Model'

import Api from '../../service/Api'

import './style.scss'

import { MdPayments, MdDeleteOutline } from 'react-icons/md' // pagar | deletar

export default function Painel() {
  const [abrirModel, setAbrilModel] = useState(false)
  const [listaDePagamento, setListaDePagamento] = useState([])

  useEffect(() => {
    (async () => {
      await Api.get('/lista/pagamento')
      .then((r)=> {
        setListaDePagamento(r.data)
      })
    })()
  }, [])

 async function PagarParcela(id_pagamento){
    await Api.patch(`/pagamento?id_pagamento=${id_pagamento}`)
    .then(async ()=> {
        await Api.get('/lista/pagamento')
        .then((r)=> {
          setListaDePagamento(r.data)
          setAbrilModel(false)
        })
    })
    .catch((err)=> {
      console.log('deu erro', err)
    })
  }
  async function RemovePagamento(id_pagamento){
    await Api.delete(`/remove/pagamento?id_pagamento=${id_pagamento}`)
    .then(async ()=> {
        await Api.get('/lista/pagamento')
        .then((r)=> {
          setListaDePagamento(r.data)
          setAbrilModel(false)
        })
    })
    .catch((err)=> {
      console.log('deu erro', err)
    })
  }
  return (
    <>
    <Header />
    <main className='ContainerLogado ContainerPainel'>
        <h1 style={{color: '#fff'}}>Painel</h1>
        <hr />
        {listaDePagamento.length === 0 && (
          <p style={{color: 'var(--branco)', margin: '1rem 0'}} >Você não possui conta para pagar.</p>
        )}
        <section className='ContainerLista'>
          {listaDePagamento.map((p) => {
            return(
              <>
              <article className='BoxLista' key={p.id}>
                <button className='AbrirModal' onClick={ () => setAbrilModel(p.id)}>{p.titulo}</button>
              </article>

              <Model isOpen={abrirModel} id={p.id}>
                <button onClick={ () => setAbrilModel(false)} className='fechaModel'><AiOutlineCloseCircle className='iconFechamodel'/></button>
                <div className='basedoModel'>
                    <h2>{p.titulo}</h2>

                    <textarea  disabled={true} value={p.descricao}/>

                    <p>
                    Valor: <input type="text" disabled={true} value={'R$ ' + p.valor}/>
                    </p>
                    <p>
                    Dia de vencimento: <input type="text" disabled={true} value={p.parcelas === 1 ? `Dia ${p.dia_de_vencimento} é a último parcela.` : 'todo dia ' + p.dia_de_vencimento}/>
                    </p>
                    <p>
                      {p.parcelas === 1 ? 'Parcela restante:' : 'Pacelas restantes: '}
                      <input type="text" disabled={true} 
                      value={p.parcelas === 1 ? `Última parcela` : `${p.parcelas} parcelas`}/>
                    </p>
                    <div className='basebuttonDeAcao'>

                      <button className='buttonDeAcao vermelho'
                      onClick={ () => RemovePagamento(p.id)}><MdDeleteOutline className='iconBotaoAcao'/> Remove</button>

                      <button className='buttonDeAcao verde'
                      onClick={ () => PagarParcela(p.id)}> <MdPayments className='iconBotaoAcao'/> Pagar parcela</button> 
                    </div>
                </div>
              </Model>
              </>
            )
          })}
        </section>
    </main>
    </>
  )
}
