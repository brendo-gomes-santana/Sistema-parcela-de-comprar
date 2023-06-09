import React from 'react'

import './style.scss'

export default function Input({ ...rest }) {
  return (
    <input { ...rest} className='InputPersonalizada'/>
  )
}
