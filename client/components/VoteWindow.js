import React, { useState } from 'react'
import VoteButtons from './VoteButtons'
import styles from "../styles/voteWindow.module.css"
import CloseIcon from '@material-ui/icons/Close';
import ImageVoteToggle from "./ImageVoteToggle"

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
                    <div className={styles.quitVoteWindow} onClick={props.closeWindow}>
                        <CloseIcon />
                    </div>
                    <br/>
                    <h3>Wich picture is better?</h3>
                    <div className={styles.imageToggleContainer}>
                        <ImageVoteToggle images={props.windowPost.images} />
                    </div>
                    {/* {imgSwap ? 
                    <img className={styles.voteImage} src={props.windowPost.images.image2}/> :
                    <img className={styles.voteImage} src={props.windowPost.images.image1}/>} */}
                    <VoteButtons clicked={props.clicked} openHandler={props.openHandler} postIndex={props.postIndex} postId={props.windowPost._id} imgSwap={imgSwap} swap={swap}/>
                </div> 
            </div>}
        </div>
    )
}

export default VoteWindow
