import React, { useState } from 'react'
import Head from 'next/head'
import { TextField, Button } from '@material-ui/core';
import Link from "next/link"
import axios from "axios"
import styles from '../styles/login.module.css'
import {useRouter} from 'next/router'

function login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loginErr, setLoginErr] = useState()
    const router = useRouter()

    function login(){
        const data = {username: email, password}
        axios({
            method: "POST",
            url: process.env.NEXT_PUBLIC_SERVER_URL + "/login",
            withCredentials: true,
            data: data
        }).then(res =>{
            if (res.data==="ok"){
                // router.push("/")
                window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
            } else if (res.data === "usedoesnotexist") {
                setLoginErr("Username Or Password Are Incorrect")
            }
        })

        // localStorage.setItem("auth", "true")
        // console.log(process.env.NEXT_PUBLIC_FRONT_URL);
        // window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL + "/") 
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Login</h1>
            <form>
                <TextField id="outlined-basic-email" type="username" name="username" label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                <br/>
                <br/>
                <TextField id="outlined-basic-password" type="password" name="password" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                <br/>
                <p className={styles.loginErr}>{loginErr}</p>
                <br/>
                <Button style={{color: "#512B58", borderRadius: "8px"}} onClick={login} variant="outlined" color="primary">Login</Button>
                <br/>
                <p>Don't have an account yet? <Link href="/register"><a className={styles.registerButton}> Register</a></Link></p>
            </form>
        </div>
    )
}

export default login