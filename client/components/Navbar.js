import React from 'react'
import styles from "../styles/navbar.module.css"
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Redirect from './Redirect';
import Link from "next/link"


function Navbar() {


      
    return (
        <div>
            <div className={styles.navbar}>
                
                <Link href="/home">
                     <a className={styles.homeBtn}>   
                        <HomeIcon/>
                     </a>
                </Link>     
             
                <Link href="/profile">
                     <a className={styles.profileBtn}>   
                        <AccountCircleIcon />
                     </a>
                </Link>      
            </div>
        </div>
    )
}

export default Navbar
