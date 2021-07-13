import React, { useState } from 'react'
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import styles from "../styles/Pause.module.css"
import axios from 'axios';

function Pause(props) {

    const {active, postId} = props
    const [isActive, setIsActive] = useState(active)

    function pauseHandler(){
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/pause-toggle/" + postId, withCredentials: true})
            .then(res => {
                setIsActive(!isActive)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div onClick={pauseHandler}>
        { isActive ? 
            <div className={styles.pauseBtn}>
                <span className={styles.pauseIcon}>
                    <PauseIcon/>
                </span>
                <span className={styles.pauseText}>
                    Pause
                </span>
            </div>
            :
            <div>
                <div className={styles.pauseBtn}>
                    <span className={styles.pauseIcon}>
                        <PlayArrowIcon/>
                    </span>
                    <span className={styles.pauseText}>
                        Activate
                    </span>
                </div>
            </div>
}
        </div>
    )
}

export default Pause
