import React from 'react'
import Link from "next/link"
import styles from "../styles/home.module.css"
import AddIcon from '@material-ui/icons/Add';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { Card } from '@material-ui/core'
import axios from "axios"

function home() {

    // function vote(){
    //     axios.get("http://localhost:4000").then(res => {console.log(res)})
    // }

    return (
        <div className={styles.homeContainer}>

            <Link href="/post">
                <a>
                    <Card><AddIcon style={{ fontSize: 200 }}/><p>New post</p></Card>
                </a>
            </Link>

            <br/>

            <Link href="/vote">
                <a>
                    <Card><HowToVoteIcon style={{ fontSize: 200 }}/><p>Vote on others</p></Card>
                </a>
            </Link>

        </div>
    )
}

export default home
