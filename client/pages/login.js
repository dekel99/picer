import React from 'react'
import Head from 'next/head'
import { TextField, Button } from '@material-ui/core';
import Link from "next/link"


function login() {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Login</h1>
            <form>
                <TextField id="outlined-basic" type="email" label="Email" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic" type="password" label="Password" variant="outlined" />
                <br/>
                <br/>
                <Button variant="outlined" color="primary">Login</Button>
                <br/>
                <p>dont have an acount yet? <Link href="/register"><a className="register-link">Register</a></Link></p>
            </form>
        </div>
    )
}

export default login