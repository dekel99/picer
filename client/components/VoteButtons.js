import React, { useState } from 'react'
import axios from 'axios';
import Loading from './Loading';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from "../styles/voteButtons.module.css"

function VoteButtons(props) {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    function sendVote(){
        setLoading(true)

        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/vote/" + props.postId + "/" + props.imgChosen, withCredentials: true})
            .then(res => {  
                setLoading(false)
                if (res.data==="ok"){
                    localStorage.setItem("votedList", [localStorage.getItem("votedList"), props.postIndex])
                    props.clicked()
                } else {
                    throw Error(res.data)
                }
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }

    return (
        <div>            
            <Loading loading={loading} />
            <div className={styles.btnsContainer}>
                <br/>
                <br/>
                <Button onClick={sendVote} style={{color: "white", borderRadius: "5px"}} variant="contained" color="primary">Vote!</Button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </div>
        </div>

    )
}

export default VoteButtons
