import React, { useState } from 'react'
import VoteButtons from './VoteButtons'
import styles from "../styles/voteWindow.module.css"
import CloseIcon from '@material-ui/icons/Close';
import ImageVoteToggle from "./ImageVoteToggle"

function VoteWindow(props) {
    const [imgChosen, setImgChosen] = useState("image1")

    function chosen(imgIndex){
        if(imgIndex===0){
            setImgChosen("image1")
        } else{
            setImgChosen("image2")
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
                        <ImageVoteToggle  chosen={chosen} images={props.windowPost.images} />
                    </div>
                    <VoteButtons clicked={props.clicked}
                     openHandler={props.openHandler}
                      postIndex={props.postIndex}
                       postId={props.windowPost._id}
                        imgChosen={imgChosen}/>
                </div> 
            </div>}
        </div>
    )
}

export default VoteWindow
