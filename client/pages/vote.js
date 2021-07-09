import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from "../components/PostCard"
import LoadingSmall from '../components/LoadingSmall'
import NotFound from '../components/NotFound'
import VoteWindow from '../components/VoteWindow'
import styles from "../styles/vote.module.css"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Karma from '../components/Karma'

function vote() {

    const [postList, setPostList] = useState()
    const [loading, setLoading] = useState(false)
    const [voteWinOpen, setVoteWinOpen] = useState(false)
    const [windowPost, setWindowPost] = useState()
    const [postIndex, setPostIndex] = useState()
    const [voteClicked, setVoteClicked] = useState(false)
    const [noPostsMessage, setNoPostsMessage] = useState(false)
    const [error, setError] = useState()

    // Checks if user is auth and render list of posts
    useEffect(() => {
        setLoading(true)
        localStorage.setItem("votedList", "")
        axios({mothed: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/posts", withCredentials: true})
            .then(res => {
                if (res.data.success){
                    if(res.data.newList.length!==0){
                        setLoading(false)
                        setPostList(res.data.newList)
                    } else {
                        setNoPostsMessage(true)
                        setLoading(false)
                    }
                } else {
                    throw Error(res.data.message)
                }
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Triger when user votes **
    function clicked(){
        voteClicked ? setVoteClicked(false) : setVoteClicked(true)
        setVoteWinOpen(false)
    }

    // Open post and put it inside state
    function openHandler(e){
        if(e.target.className==="voteWindow_windowContainer__3Ny31" || e.target.alt){
            voteWinOpen ? setVoteWinOpen(false) : 
            setVoteWinOpen(true)
            setPostIndex(e.target.alt)
            const postClicked = postList.slice(0).reverse()[e.target.alt]
            setWindowPost(postClicked)
        }
    }

    function closeWindow() {
        setVoteWinOpen(false)
    }

    return (
        <div>
            {error && <p>{error}</p>}
            <NotFound notFound={noPostsMessage} />
            <LoadingSmall loading={loading} regular={false} style={{marginTop: "200px"}}/>
            {postList && <Karma voteClicked={voteClicked} />}
            {postList && postList.slice(0).reverse().map((post, index) => {
                
                // Checks in users localstorage wich posts allready voted and change there style
                let checkIfVoted=false
                if (localStorage.getItem("votedList").includes(index)){
                    checkIfVoted=true
                }
                return(
                    <div className={styles.postContainer} onClick={openHandler} key={index}>
                        {checkIfVoted && 
                            <div className={styles.voted}>
                                <div className={styles.checkIcon}>
                                    <CheckCircleOutlineIcon style={{color: "#339f3d", fontSize: "50px"}} />
                                </div>
                            </div>}
                        <PostCard
                            index={index}  
                            postId={post._id}   
                            name={post.name} 
                            title={post.title} 
                            images={post.images} 
                            description={post.description} 
                            time={post.time}
                            voteClicked={checkIfVoted && voteClicked}
                            clicked={clicked}
                        />
                    </div>
                )
            })}
            <VoteWindow
               clicked={clicked} 
               postIndex={postIndex}
               windowPost={windowPost}
               openHandler={openHandler}
                voteWinOpen={voteWinOpen}
                closeWindow={closeWindow}
                 />
        </div>
    )
}

export default vote
