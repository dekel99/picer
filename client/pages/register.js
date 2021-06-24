import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from "next/link"
import axios from 'axios';

function register() {

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()

    function registerUser(){
        const data = {email, name, password, confirm}
        axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/register",data)
        .then(res => {
            if(res){
                console.log(res)
            }
        }).catch(err=> console.log(err))
    }
    
    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <h1>Register</h1>
            <form>
                <TextField id="outlined-basic-name" type="text" label="Full Name" variant="outlined" onChange={(e) => {setName(e.target.value)}}/>
                <br/>
                <br/>
                <TextField id="outlined-basic-email" type="email" label="Email" variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                <br/>
                <br/>
                <TextField id="outlined-basic-password" type="password" label="Password" variant="outlined" onChange={(e) => {setPassword(e.target.value)}}/>
                <br/>
                <br/>
                <TextField id="outlined-basic-confirm" type="password" label="Confirm Password" variant="outlined" onChange={(e) => {setConfirm(e.target.value)}}/>
                <br/>
                <br/>
                <Button variant="outlined" color="primary" onClick={registerUser}>Register</Button>
                <br/>
                <p>already have an acount? <Link href="/login"><a className="login-link">Login</a></Link></p>
            </form>
        </div>
    )
}

export default register