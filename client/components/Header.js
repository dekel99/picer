import React from 'react'
import { useState, useEffect } from 'react'
import styles from "../styles/header.module.css"
import { Button } from '@material-ui/core'
import Drawer from "../components/Drawer"
import Link from "next/link"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';


function Header(props) {

    return (
       <div>
            <div className={styles.appNameContainer}>
                <Link href="/">
                    <a>
                        <h1 className={styles.appName}>picer</h1>
                    </a>
                </Link>

                {props.isAuth ? null : <div className={styles.drawerContainer}>
                    <Drawer/>
                </div>}

                <div className={styles.btnsContainer}>
                    <Link href="/register">
                        <a>
                            <div className={styles.logBtn}>
                                <Button size="small" variant="outlined" style={{color: "white", borderColor: "white", borderRadius: "8px"}} >Register</Button>
                            </div>
                        </a>
                    </Link>
       
                    <Link href="/login">
                        <a>
                            <div className={styles.regBtn}>
                                <Button size="small" variant="outlined" style={{color: "white", borderColor: "white", borderRadius: "8px"}} >Login</Button>
                            </div>    
                        </a>
                    </Link>
                </div>
           </div>
       </div>
    )
}


export default Header
