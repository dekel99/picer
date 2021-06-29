import React from 'react'
import Card from '@material-ui/core/Card';
import styles from "../styles/postCard.module.css"



function PostCard(props) {

    const {name, images, title, description, time, votes, index} = props
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
        <div>
            <div className={styles.cardContainer}>
                <Card>
                    <p className={styles.username}>{name}</p>

                    <div className={styles.imagesContainer}>
                        <img className={styles.image1} src={images.image1} alt={index}></img>
                        <img className={styles.image2} src={images.image2} alt={index}></img>
                    </div>

                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.time}>{time}</p>
                    {votes && <div className={styles.resultsContainer}>
                        <p>results:</p>
                        <p style={{fontWeight: "bold"}}>{barValue}%</p>
                        <progress className={styles.voteBar} max="100" value={barValue}> 70% </progress>
                        <h2 className={styles.img1Resulat}>{votes.image1.length}</h2> 
                        <h2 className={styles.img2Resulat}>{votes.image2.length}</h2>
                    </div>}
                </Card>
            </div>
        </div>
    )
}

export default PostCard
