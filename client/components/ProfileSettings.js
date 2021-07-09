import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import Link from "next/link"
import { Button } from '@material-ui/core';
import axios from 'axios';
import styles from "../styles/profileSettings.module.css"

function ProfileSettings(props) {

    const [newName, setNewName] = useState()
    const [currentPass, setCurrentPass] = useState()
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [passErr, setPassErr] = useState()
    const [passChangeSuccess, setPassChangeSuccess] = useState()
    const [nameErr, setNameErr] = useState()
    const [nameChangeSuccess, setNameChangeSuccess] = useState()

    function logout(){
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/logout", withCredentials: true})
            .then(res => {
                if (res.data==="logout"){
                    window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
                }
            })
    }

    function changeNameHandler(){
        axios({method: "POST", url: process.env.NEXT_PUBLIC_SERVER_URL + "/change-name", withCredentials: true, data: {name: newName}})
            .then(res => {
                if(res.data.success){
                    setNameErr()
                    setNameChangeSuccess(res.data.message)
                } else {
                    setNameChangeSuccess()
                    setNameErr(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function changePassHandler(){
        const data = {currentPass, newPass, confirmPass}

        axios({method: "POST", url: process.env.NEXT_PUBLIC_SERVER_URL + "/change-password", withCredentials: true, data: data})
            .then(res => { 
                if(res.data.success){
                    setPassErr()
                    setPassChangeSuccess(res.data.message)
                } else {
                    setPassChangeSuccess()
                    setPassErr(res.data.message)
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div className={styles.accountContianer}>

            <div className={styles.nameBorder}>
                <div className={styles.newNameContainer}>
                    <label className={styles.nameLabel}>‏‏‎Change name:</label>
                    <TextField id="outlined-basic-name" size="small" label={props.name} variant="outlined" onChange={(e) => setNewName(e.target.value)}/>
                    <p className={styles.nameNote}>Your display name on posts</p>
                    <Button style={{color: "#512B58", borderRadius: "5px", margin: "5px"}} onClick={changeNameHandler} size="small" variant="outlined" color="primary">Save</Button>
                    {nameErr && <p style={{color: "red"}}>{nameErr}</p>}
                    {nameChangeSuccess && <p>{nameChangeSuccess}</p>}
                </div>
            </div>

            <div className={styles.passBorder}>
                <div className={styles.newPassContainer}>
                    <label className={styles.passLabel}>‏‏‎ ‎Password:</label>
                    <div className={styles.passField}><TextField style={{margin: "3px"}} id="newPass" size="small" type="password" label="Current password" variant="outlined" onChange={(e) => setCurrentPass(e.target.value)}/></div>     
                    <div className={styles.passField}><TextField style={{margin: "3px"}} type="password" size="small" label="New password" variant="outlined" onChange={(e) => setNewPass(e.target.value)}/></div>
                    <div className={styles.passField}><TextField style={{margin: "3px"}} type="password" size="small" label="Confirm password" variant="outlined" onChange={(e) => setConfirmPass(e.target.value)}/></div>
                    <Button onClick={changePassHandler} style={{color: "#512B58", borderRadius: "5px", margin: "15px"}} size="small" variant="outlined" color="primary">Change Password</Button>
                    {passErr && <p style={{color: "red", margin: "0"}}>{passErr}</p>}
                    {passChangeSuccess && <p>{passChangeSuccess}</p>}
                </div>
            </div>

            <br/>
            <Link href="/">
                <a><Button style={{color: "#512B58", borderRadius: "5px"}} onClick={logout} variant="outlined" color="primary">Logout</Button></a>
            </Link>
        </div>
    )
}

export default ProfileSettings
