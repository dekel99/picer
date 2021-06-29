import React, { useState } from 'react'
import VoteButtons from './VoteButtons'
import styles from "../styles/voteWindow.module.css"

function VoteWindow(props) {
    const [imgSwap, setImgSwap] = useState(false)

    function swap(imgNum){
        if(imgNum==="1"){
            setImgSwap(false)
        } else {
            setImgSwap(true)
        } 
    }

    return (
        <div>
            {props.voteWinOpen && 
            <div className={styles.windowContainer} onClick={props.openHandler}>
                <div className={styles.voteWindow}>
                    <h1>vote here</h1>
                    {imgSwap ? 
                    <img className={styles.voteImage} src={props.windowPost.images.image2}/> :
                    <img className={styles.voteImage} src={props.windowPost.images.image1}/>}
                    <VoteButtons postIndex={props.postIndex} postId={props.windowPost._id} imgSwap={imgSwap} swap={swap}/>
                </div> 
            </div>}
        </div>
    )
}

export default VoteWindow
