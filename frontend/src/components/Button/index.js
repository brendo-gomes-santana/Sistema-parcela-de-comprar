import React from 'react'

import './style.scss'

export default function Button({ children, ...rest }) {
  return (
    <button className='ButtonPersonalizado' { ...rest } >
        {children}
    </button>
  )
}
