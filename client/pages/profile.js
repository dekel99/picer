import React, { useEffect, useState } from 'react'
import {CheckAuth} from "../components/CheckAuth"
import ProfileMenu from "../components/ProfileMenu"
import styles from "../styles/profile.module.css"
// import axios from 'axios';
import { useAxios } from '../hooks/useAxios';

function profile() {
    const [axios] = useAxios()
    const [name, setName] = useState()

    useEffect(() => {
        let isMounted = true;
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/get-name", withCredentials: true})
            .then(res => {
                if (res.data && isMounted){
                    setName(res.data)
                }
            })
            .catch(err => console.log(err))

        CheckAuth().then(res => {
            if(!res){
                window.location.replace(process.env.NEXT_PUBLIC_FRONT_URL)
            }
        })
        .catch(err => console.log(err))

        return () => { isMounted = false }
    }, [])

    return (
        <div>
            <h2 className={styles.helloText}>Hi, {name}</h2>
            <div className={styles.profileMenuContainer}>
                <ProfileMenu name={name}/>
            </div>
        </div>
    )
}

export default profile
