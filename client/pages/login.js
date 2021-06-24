import React, { useState } from 'react'
import Head from 'next/head'
import { TextField, Button } from '@material-ui/core';
import Link from "next/link"
import axios from "axios"
import styles from '../styles/login.module.css'

function login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function login(){
        // const data = {email, password}
        // axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/login",data)
        //     .then(res =>{

        //     })

        localStorage.setItem("auth", "true")
        console.log(process.env.NEXT_PUBLIC_FRONT_URL);
        window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL + "/") 
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Login</h1>
            <form>
                <TextField id="outlined-basic-email" type="email" label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                <br/>
                <br/>
                <TextField id="outlined-basic-password" type="password" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                <br/>
                <br/>
                <Button style={{color: "#512B58", borderRadius: "8px"}} onClick={login} variant="outlined" color="primary">Login</Button>
                <br/>
                <p>Don't have an account yet? <Link href="/register"><a className={styles.registerButton}> Register</a></Link></p>
            </form>
        </div>
    )
}

export default login