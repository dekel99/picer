import React from 'react'
import styles from "../styles/header.module.css"
import { Button } from '@material-ui/core'
import Drawer from "../components/Drawer"
import Link from "next/link"


function Header() {
    return (
        <div>
            <div className={styles.appNameContainer}>
            
            <Link href="/">
                <a>
                    <h1 className={styles.appName}>picer</h1>
                </a>
            </Link>

                <div className={styles.drawerContainer}>
                    <Drawer/>
                </div>

                <div className={styles.btnsContainer}>
                    <Link href="/register">
                        <a>
                            <div className={styles.logBtn}>
                                <Button size="small" variant="outlined" style={{color: "white", borderColor: "white"}} >Register</Button>
                            </div>
                        </a>
                    </Link>
        
                    <Link href="/login">
                        <a>
                            <div className={styles.regBtn}>
                                <Button size="small" variant="outlined" style={{color: "white", borderColor: "white"}} >Login</Button>
                            </div>    
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
