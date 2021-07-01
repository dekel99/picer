import React, { useEffect, useState } from 'react'
import ProfileSettings from '../components/ProfileSettings';
import UserPosts from '../components/UserPosts';
import {CheckAuth} from "../components/CheckAuth"
import { Button } from '@material-ui/core';

function profile() {

    const [openSettings, setOpenSettings] = useState(true)

    useEffect(() => {
        CheckAuth().then(res => {
            if(!res){
                window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
            }
        })
        .catch(err => console.log(err))
    }, [])

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
