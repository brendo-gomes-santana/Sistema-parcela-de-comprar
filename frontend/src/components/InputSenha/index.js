import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import './style.scss'

export default function InputSenha({ ...rest }) {

    const [mostrar, setMostrar] = useState(false)

  return (
    <div className="ComponentInputPassword">
      <input type={mostrar ? 'text' : 'password'} {...rest} />
      <span onClick={() => setMostrar(!mostrar)}>
        { mostrar ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
      </span>
    </div>
  )
}
