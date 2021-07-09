import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from "next/link"
import axios from 'axios';
import {useRouter} from 'next/router'
import styles from "../styles/register.module.css"

function register() {

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [registerErr, setRegisterErr] = useState()
    const router = useRouter()


    function registerUser(){
        const data = {username: email, name, password, confirm}

        // if (email === undefined) {
        //     setRegisterErr("Please enter an email")
        // } else if (!email.includes("@") && !email.includes(".")){
        //     setRegisterErr("Email must be a valid email acount")
        // } else if (name === undefined){
        //     setRegisterErr("Please enter your name")
        // } else if (name.length < 2){
        //     setRegisterErr("Name must be at least 2 characters")
        // } else if (password === undefined) {
        //     setRegisterErr("Please enter a password")
        // } else if (confirm === undefined) {
        //     setRegisterErr("Please enter your password again to confirm it")
        // } else if (password.length < 6) {
        //     setRegisterErr("Password must be at least 6 characters")
        // } else if (!/[a-zA-Z]+$/.test(password)) {
        //     setRegisterErr("Password must contain letters")
        // } else if (password !== confirm) {
        //     setRegisterErr("Passwords must match")
        // } else {
            axios({
                method: "POST",
                url: process.env.NEXT_PUBLIC_SERVER_URL + "/register",
                withCredentials: true,
                data: data
            })
                .then(res => {
                    if(res.data.success){
                        window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
                    } else {
                        setRegisterErr(res.data.message)
                    }
                }).catch(err=> console.log(err))
        // }
    }
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Register</title>
            </Head>
            <h1>Register</h1>
            <p className={styles.registerErr}>{registerErr}</p>
            <form>

                <div className={styles.nameField}>
                    <TextField size="small" id="outlined-basic-name" type="text" label="Full Name" variant="outlined" onChange={(e) => {setName(e.target.value)}}/>
                </div>
                
                <div className={styles.nameField}>
                    <TextField size="small" id="outlined-basic-email" type="username" name="username" label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>

                <div className={styles.nameField}>
                    <TextField size="small" id="outlined-basic-password" type="password" name="password" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <div className={styles.nameField}>
                    <TextField size="small" id="outlined-basic-confirm" type="password" label="Confirm Password" variant="outlined" onChange={(e) => {setConfirm(e.target.value)}}/>
                </div>

                <Button onClick={registerUser} style={{color: "#512B58", borderRadius: "8px"}} variant="outlined" color="primary">Register</Button>
                <p>Already have an acount? <Link href="/login"><a className={styles.registerLink}>Login</a></Link></p>
            </form>
            
        </div>
    )
}

export default register