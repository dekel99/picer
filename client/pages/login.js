import React, { useState } from 'react'
import Head from 'next/head'
import { TextField, Button } from '@material-ui/core';
import Link from "next/link"
// import axios from "axios"
import styles from '../styles/login.module.css'
import { useAxios } from '../hooks/useAxios';

function login() {
    const [axios] = useAxios()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loginErr, setLoginErr] = useState()

    function loginUser(loginType){
        let data
        if (loginType==="fake"){
            localStorage.setItem("showTutorial", true)
            data = {username: "fakemail", password: "123"}
        } else {
            data = {username: email, password}
        }
        axios({
            method: "POST",
            url: process.env.NEXT_PUBLIC_SERVER_URL + "/login",
            withCredentials: true,
            data: data
        }).then(res =>{ console.log(res)
            if (res.data.success){
                localStorage.setItem("token", res.data.accessToken)
                window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
            } else {
                setLoginErr(res.data)
            }
        }).catch(err => {console.log(err)})
    }
    
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Login</h1>
            <p className={styles.loginErr}>{loginErr}</p>
            <form>
                <div className={styles.emailField}>
                    <TextField id="outlined-basic-email" size="small" type="username" name="username" label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
 
                <div className={styles.passField}>
                    <TextField id="outlined-basic-password" size="small" type="password" name="password" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <div className={styles.loginBtn}>
                    <Button style={{color: "#512B58", borderRadius: "5px"}} onClick={loginUser} variant="outlined" color="primary">Login</Button>
                </div>
                <p>Don't have an account yet? <Link href="/register"><a className={styles.registerButton}> Register</a></Link></p>
                <a style={{cursor: "pointer", display: "block", margin: "16px"}} onClick={() => loginUser("fake")} className={styles.registerButton}>Fake login to view app</a>
                <div style={{color: "grey"}} className={styles.tooltip}>Can't login?
                    <span styles={{padding: "16px"}} className={styles.tooltiptext}>The app login is based on third party cookies, please enable them in the browser settings to properly login.</span>
                </div>
            </form>
        </div>
    )
}

export default login