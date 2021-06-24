import React from 'react'
import { useState, useEffect } from 'react'
import styles from "../styles/header.module.css"
import { Button } from '@material-ui/core'
import Drawer from "../components/Drawer"
import Link from "next/link"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';


function Header() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("auth")==="true"){
        setIsAuth(true)
        } else {
        setIsAuth(false)
        }
    }, [])

    if (isAuth) {
        return (<div>
            <div className={styles.appNameContainer}>
            
            <Link href="/">
                <a>
                    <h1 className={styles.appName}>picer</h1>
                </a>
            </Link>

                <div className={styles.btnsContainer}>
                    <Link href="/profile">
                        <a>
                            <div className={styles.logBtn}>
                            <AccountCircleIcon style={{ fontSize: 32, color: "#F9F9F9" }}/>
                            </div>
                        </a>
                    </Link>

                    <Link href="/post">
                        <a>
                            <div className={styles.logBtn}>
                                <AddIcon style={{ fontSize: 32, color: "#F9F9F9" }}/>
                            </div>
                        </a>
                    </Link> 
                </div>
            </div>
        </div>)
    } else {
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
}

export default Header
