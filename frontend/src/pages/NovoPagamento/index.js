import React, { useState } from 'react'

import Style from './style.module.scss'

import Header from '../../components/Header'
import Button from '../../components/Button'

import Api from '../../service/Api'

export default function NovoPagamento() {
    const [loading, setLoading] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diaDeVencimento, setDiaDeVencimento] = useState('')
    const [valor, setValor] = useState('');
    const [parcelas, setParcelas] = useState(null)

    const formatarMoeda = (e) => {
        let inputValor = e.target.value;
    
        inputValor = inputValor + '';
        inputValor = parseInt(inputValor.replace(/[\D]+/g, ''));
        inputValor = inputValor + '';
        inputValor = inputValor.replace(/([0-9]{2})$/g, ',$1');
    
        if (inputValor.length > 6) {
          inputValor = inputValor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
        }
    
        setValor(inputValor);
        if (inputValor === 'NaN') setValor('');
      };

      async function handleCadastrarNovoPagamento(e){
        e.preventDefault()
        if(!titulo || !diaDeVencimento || !valor || !parcelas){
            alert('Preenchar os campos')
            return;
        }
        setLoading(true)
        await Api.post('/create/pagamento', {
            titulo,
            descricao,
            dia_de_vencimento: diaDeVencimento,
            valor,
            parcelas: Number(parcelas)
        })
        .then(()=> {
            setTitulo('')
            setDescricao('')
            setDiaDeVencimento('')
            setValor('')
            setParcelas('')
            alert('Criado com sucesso')
            setLoading(false)

        })
        .catch((err)=> {
            console.log(`Algo deu errado:`)
            console.log(err)
            setLoading(false)
        })

      }
  return (
    <>
        <Header />
        <main className={Style.Container}>
            <h1>Criar Novo Pagamento</h1>
            <hr />
            <section className={Style.ContainerForm}>
                <form className={Style.form} onSubmit={handleCadastrarNovoPagamento}>
                    <label>
                        Título: <input type="text" className={Style.input} value={titulo}
                                onChange={ v => setTitulo(v.target.value) }/>
                    </label>
                    <label>
                        Descrição: <textarea type="text" className={Style.inputTextarea} value={descricao}
                                    onChange={ v => setDescricao(v.target.value)} placeholder='Não é obrigatório escrever aqui'/>    
                    </label>
                    <label>
                        Dia de vencimento: <input type="text" className={Style.input} value={diaDeVencimento}
                                            onChange={ v => setDiaDeVencimento(v.target.value) } placeholder='Colocar somente o dia'/>
                    </label>
                    <label>
                       Valor: <input type="text" value={'R$ ' + valor} onChange={formatarMoeda} className={Style.input}/>
                    </label>
                    <label>
                        Parcelas: <input type="number" className={Style.input} value={parcelas}
                                    onChange={ v => setParcelas(v.target.value) }/>
                    </label>
                    <Button type='submit' disabled={loading}> {loading? 'Carregando ...' : 'Cadastrar'}</Button>
                </form>
            </section>
        </main>
    </>
  )
}
