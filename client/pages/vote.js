import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from "../components/PostCard"
import Loading from '../components/Loading'
import VoteWindow from '../components/VoteWindow'
import styles from "../styles/vote.module.css"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function vote() {

    const [postList, setPostList] = useState()
    const [loading, setLoading] = useState(false)
    const [voteWinOpen, setVoteWinOpen] = useState(false)
    const [windowPost, setWindowPost] = useState()
    const [postIndex, setPostIndex] = useState()
    const [error, setError] = useState()


    useEffect(() => {
        setLoading(true)
        localStorage.setItem("votedList", "")
        axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/posts")
            .then(res => {
                if (res.data){
                    setLoading(false)
                    setPostList(res.data)
                } else {
                    throw Error("Somthing is wrong please log and try again")
                }
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    function openHandler(e){
        if(e.target.className==="voteWindow_windowContainer__3Ny31" || e.target.alt){
            voteWinOpen ? setVoteWinOpen(false) : setVoteWinOpen(true)
        }

        if(e.target.alt){
            setPostIndex(e.target.alt)
            const postClicked = postList.slice(0).reverse()[e.target.alt]
            setWindowPost(postClicked)
        }
    }

    return (
        <div>
            {error && <p>{error}</p>}
            <Loading loading={loading} />
            {postList && postList.slice(0).reverse().map((post, index) => {
                let checkIfVoted=false
                if (localStorage.getItem("votedList").includes(index)){
                    checkIfVoted=true
                }
                return(
                    <div className={styles.postContainer} onClick={openHandler} key={index}>
                        {checkIfVoted && <div className={styles.voted}>
                            <div className={styles.checkIcon}>
                                <CheckCircleOutlineIcon style={{color: "#339f3d", fontSize: "50px"}} />
                            </div>
                        </div>}
                        <PostCard   
                            index={index}     
                            name={post.name} 
                            title={post.title} 
                            images={post.images} 
                            description={post.description} 
                            time={post.time}
                        />
                    </div>
                )
            })}
            <VoteWindow postIndex={postIndex} windowPost={windowPost} openHandler={openHandler} voteWinOpen={voteWinOpen} />
        </div>
    )
}

export default vote
