import React from 'react'
import { TextField } from '@material-ui/core';
import Link from "next/link"
import { Button } from '@material-ui/core';

function profile() {

    function logout(){
        localStorage.setItem("auth", "false")
        window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL + "/") 
    }

    return (
        <div>
            <h1>profile</h1>
            <label>Full name</label>
            <TextField id="outlined-basic-name" type="text" label="Full name" variant="outlined" />
            <br/>
            <br/>
            <label>Email</label>
            <TextField id="outlined-basic-email" type="text" label="Email" variant="outlined" />
            <br/>
            <br/>
            <Link href="/change-password">
                <a><Button style={{color: "#512B58", borderRadius: "8px"}} variant="outlined" color="primary">Change Password</Button></a>
            </Link>
            <br/>
            <br/>
            <Link href="/">
                <a><Button style={{color: "#512B58", borderRadius: "8px"}} onClick={logout} variant="outlined" color="primary">Logout</Button></a>
            </Link>
        </div>
    )
}

export default profile
