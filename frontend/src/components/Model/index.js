import React from 'react'

import styles from './style.module.scss'

export default function MOdel({ isOpen, children, id }) {
    if(isOpen === id){
        return (
            <div className={styles.baseModel}>
                <div className={styles.box}>
                    {children}
                </div>
            </div>
          )
    }
}
