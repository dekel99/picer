import React from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from "next/link"
import styles from "../styles/register.module.css"

function register() {
    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <h1>Register</h1>
            <form>
                <TextField id="outlined-basic-name" type="text" label="Full Name" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic-email" type="email" label="Email" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic-password" type="password" label="Password" variant="outlined" />
                <br/>
                <br/>
                <TextField id="outlined-basic-confirm" type="password" label="Confirm Password" variant="outlined" />
                <br/>
                <br/>
                <Button style={{color: "#512B58", borderRadius: "8px"}} variant="outlined" color="primary">Register</Button>
                <br/>
                <p>Already Have An Acount? <Link href="/login"><a className={styles.registerLink}>Login</a></Link></p>
            </form>
        </div>
    )
}

export default register