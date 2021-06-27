import React, { useState } from 'react'
import ProfileSettings from '../components/ProfileSettings';
import UserPosts from '../components/UserPosts';
import { Button } from '@material-ui/core';

function profile() {

    const [openSettings, setOpenSettings] = useState(true)
    // const [openMyPosts, setOpenMyPosts] = useState(false)

    return (
        <div>
            <h1>profile</h1>
            <Button style={{color: "#512B58", borderRadius: "8px"}} onClick={() => {setOpenSettings(false)}} variant="outlined" color="primary">My posts</Button>
            <Button style={{color: "#512B58", borderRadius: "8px"}} onClick={() => {setOpenSettings(true)}} variant="outlined" color="primary">Account settings</Button>
            <br/>
            <br/>
            {openSettings ? <ProfileSettings /> : <UserPosts />}

        </div>
    )
}

export default profile
