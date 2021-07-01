import React from 'react'
import styles from "../styles/voteResult.module.css"


function VoteResult(props) {
    const { votes } = props
    let barValue 

    if(votes){
        if (votes.image1.length >= votes.image2.length && votes.image1.length!==0){
            barValue = Math.round(100/(votes.image1.length + votes.image2.length) * votes.image1.length)
        } else if (votes.image1.length < votes.image2.length){
            barValue = Math.round(100/(votes.image1.length + votes.image2.length) * votes.image2.length)
        } else {
            barValue = 0
        }
    }

    return (
        <div className={styles.resultsContainer}>
            <p>results:</p>
            <p style={{fontWeight: "bold"}}>{barValue}%</p>
            <progress className={styles.voteBar} max="100" value={barValue}></progress>
            <h2 className={styles.img1Resulat}>{votes.image1.length}</h2> 
            <h2 className={styles.img2Resulat}>{votes.image2.length}</h2>
        </div>
    )
}

export default VoteResult
