import React from 'react'
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Link from "next/link"

function profile() {
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
        </div>
    )
}

export default profile
