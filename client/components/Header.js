import React from 'react'
import styles from "../styles/header.module.css"
import Navbar from './navbar'

function Header() {
    return (
        <div>
            <Navbar/>
            <div className={styles.appNameContainer}>
                <h1 className={styles.appName}>picer</h1>
            </div>
        </div>
    )
}

export default Header
