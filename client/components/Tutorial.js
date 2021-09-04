import React, { useState } from 'react'
import Portal from './Portal';
import styles from "../styles/Tutorial.module.css"

function Tutorial() {

    function closePage(){
        setIsTutorialOpen(false)
        localStorage.setItem("showTutorial", false)
    }

    const page1 = 
    <div className={styles.tutorialWindow}>
        <h2>Welcome to picer!</h2>
        <hr style={{margin: "0"}}/>
        <div className={styles.tutorialText}>
            <div>
                <p>Here in picer you can find your best picture</p>
                <br/>
                <p>Upload post by clicking the this icon</p>
                <img style={{height: "80px", width:"auto"}} src="https://res.cloudinary.com/ddijwyj2m/image/upload/v1626296275/assets/gzupgbwdux7ndzay5h4k.jpg"/>
                <p>it is located below on mobile and in the right corner on desktop</p>
            </div>
        </div>
        <p onClick={() => setPage(page2)} className={styles.nextBtn}>next</p>
    </div>

    const page2 = 
    <div className={styles.tutorialWindow}>
        <h2>Welcome to picer!</h2>
        <hr style={{margin: "0"}}/>
        <div className={styles.tutorialText}>
            <div>
                <p>After uploading a post people can vote for it as long as your karma bar isn't empty!</p>
                <img src="https://www.linkpicture.com/q/karmabar.png" alt="karmabar" type="image"/>
                <p>You can follow your karma in the votes page.</p>
                <br/>
                <p>To get more karma just vote for others!</p>
            </div>
        </div>
        <p onClick={() => setPage(page3)} className={styles.nextBtn}>next</p>
    </div>

    const page3 = 
    <div className={styles.tutorialWindow}>
        <h2>Welcome to picer!</h2>
        <hr style={{margin: "0"}}/>
        <div className={styles.tutorialText}>
            <div>
                <p>You can see your posts resualts in:<br/> Profile {'>'} My posts</p>
                <img style={{width: "auto", height: "300px", border: "solid", borderWidth: "1px"}} src="https://res.cloudinary.com/ddijwyj2m/image/upload/v1626295210/assets/n2zubdgywnkzxsmxi5jr.jpg"/>
            </div>
        </div>
        <p onClick={closePage} className={styles.nextBtn}>got it!</p>
    </div>

    const [page, setPage] = useState(page1)
    const [isTutorialOpen, setIsTutorialOpen] = useState(true)

    return (
        <Portal portalId={"tutorial"}>
            {isTutorialOpen &&
                <div className={styles.tutorialContainer}>
                    {page}
                </div>}
        </Portal>
    )
}

export default Tutorial
