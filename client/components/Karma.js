// import axios from 'axios'
import { useAxios } from '../hooks/useAxios';
import React, { useEffect, useState } from 'react'
import styles from "../styles/Karma.module.css"

function Karma(props) {
    const [axios] = useAxios()
    const [karma, setKarma] = useState()

    useEffect(() => {
        let isMounted = true;
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/get-karma", withCredentials: true})
            .then(res => {
                if(res.data && isMounted){
                    if (res.data.karma == 0) {
                        setKarma()
                    } else if (res.data.karma > 0 && res.data.karma <= 15){
                        setKarma(styles.lowBar)
                    } else if (res.data.karma > 15 && res.data.karma <= 29){
                        setKarma(styles.mediumBar)
                    } else if (res.data.karma == 30){
                        setKarma(styles.maxBar)
                    }
                }
            })       

        return () => { isMounted = false }
    }, [props.voteClicked])

    return (
        <div className={styles.karmaContainer}>
            <p style={{fontWeight: "700"}}>Karma:</p>
            <div className={styles.karmaBar}>
                <div className={styles.barsContainer}>
                    <div className={styles.karmaBorderLeft}></div>
                    <div className={karma} />
                    <div className={styles.karmaBorderRight}></div>
                </div> 
            </div>
        </div>
    )
}

export default Karma
