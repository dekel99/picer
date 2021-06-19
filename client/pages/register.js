import React from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from "next/link"

function register() {
    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <h1>Register</h1>
            <form>
                <TextField id="outlined-basic" type="text" label="Full Name" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic" type="email" label="Email" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic" type="password" label="Password" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic" type="password" label="Confirm Password" variant="outlined" />
                <br/>
                <br/>
                <Button variant="outlined" color="primary">Register</Button>
                <br/>
                <p>already have an acount? <Link href="/login"><a className="login-link">Login</a></Link></p>
            </form>
        </div>
    )
}

export default register