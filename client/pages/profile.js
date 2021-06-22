import React from 'react'
import { TextField } from '@material-ui/core';
import Link from "next/link"

function profile() {

    function logout(){
        localStorage.setItem("auth", "false")
        window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL + "/") 
    }

    return (
        <div>
            <h1>profile</h1>
            <label>Full name</label>
            <TextField id="outlined-basic" type="text" label="Full name" variant="outlined" />
            <br/>
            <br/>
            <label>Email</label>
            <TextField id="outlined-basic" type="text" label="Email" variant="outlined" />
            <br/>
            <br/>
            <Link href="/change-password">
                <a>Change Password</a>
            </Link>
            <br/>
            <br/>
            <Link href="/">
                <a onClick={logout}>Logout</a>
            </Link>
        </div>
    )
}

export default profile
