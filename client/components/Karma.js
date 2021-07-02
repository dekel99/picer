import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Karma.module.css"
import Loading from './Loading'

function Karma(props) {
    const [karma, setKarma] = useState()

    useEffect(() => {
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/get-karma", withCredentials: true})
            .then(res => { console.log(res.data)
                if(res.data){
                    if (res.data.karma <= 10){
                        setKarma("Low")
                    } else if (res.data.karma > 10 && res.data.karma <= 20){
                        setKarma("Meduim")
                    } else if ( res.data.karma > 20 && res.data.karma <= 29){
                        setKarma("High")
                    } else if (res.data.karma == 30){
                        setKarma("Max")
                    }
                }
            })       
    }, [props.voteClicked])

    return (
        <div>
            <p className={styles.karma}><span style={{fontWeight: "700"}}>Karma:</span> {karma ? karma : "Loading..."}</p>
        </div>
    )
}

export default Karma
