import React, { useState } from 'react'
import Portal from './Portal';
import styles from "../styles/Tutorial.module.css"

function Tutorial() {

    const [page, setPage] = useState(1)
    const [isTutorialOpen, setIsTutorialOpen] = useState(true)

    if(page===4){
        setIsTutorialOpen(false)
        setPage(5)
        localStorage.setItem("showTutorial", false)
    }

    return (
        <Portal portalId={"tutorial"}>
            {isTutorialOpen &&
                <div className={styles.tutorialContainer}>
                    <div className={styles.tutorialWindow}>
                        <h2>Welcome to picer!</h2>
                        <hr style={{margin: "0"}}/>
                        <div className={styles.tutorialText}>
                                {page===1 ?
                                    <div>
                                        <p>Here in picer you can find your best picture</p>
                                        <br/>
                                        <p>Upload post by clicking the this icon</p>
                                        <img style={{height: "80px", width:"auto"}} src="https://res.cloudinary.com/ddijwyj2m/image/upload/v1626296275/assets/gzupgbwdux7ndzay5h4k.jpg"/>
                                        <p>it is located below on mobile and in the right corner on desktop</p>
                                    </div>
                                :
                                page===2 ?
                                    <div>
                                        <p>After uploading a post people can vote for it as long as your karma bar isn't empty!</p>
                                        <img src="https://res.cloudinary.com/ddijwyj2m/image/upload/v1626293430/assets/gjysmlraucqgepd3f9d1.jpg"/>
                                        <p>You can follow your karma in the votes page.</p>
                                        <br/>
                                        <p>To get more karma just vote for others!</p>
                                    </div>
                                :
                                page===3 ?
                                    <div>
                                        <p>You can see your posts resualts in:<br/> Profile {'>'} My posts</p>
                                        <img style={{width: "auto", height: "300px", border: "solid", borderWidth: "1px"}} src="https://res.cloudinary.com/ddijwyj2m/image/upload/v1626295210/assets/n2zubdgywnkzxsmxi5jr.jpg"/>
                                    </div>
                                :
                                    null}
                        </div>
                        <p onClick={() => setPage(page+1)} className={styles.nextBtn}>{page===3 ? "got it!" : "next"}</p>
                    </div>
                </div>}
        </Portal>
    )
}

export default Tutorial
