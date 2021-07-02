import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from "../components/PostCard"
import Loading from '../components/Loading'
import VoteWindow from '../components/VoteWindow'
import styles from "../styles/vote.module.css"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Karma from '../components/Karma'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: 180,
    },
    wrapper: {
      width: 100 + theme.spacing(2),
    },
    paper: {
      zIndex: 1,
      position: 'relative',
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }));


function vote() {
    const classes = useStyles();

    const [postList, setPostList] = useState()
    const [loading, setLoading] = useState(false)
    const [voteWinOpen, setVoteWinOpen] = useState(false)
    const [windowPost, setWindowPost] = useState()
    const [postIndex, setPostIndex] = useState()
    const [voteClicked, setVoteClicked] = useState(false)
    const [error, setError] = useState()

    // Checks if user is auth and render list of posts
    useEffect(() => {
        setLoading(true)
        localStorage.setItem("votedList", "")
        axios({mothed: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/posts", withCredentials: true})
            .then(res => {
                if (res.data[0]._id){
                    setLoading(false)
                    setPostList(res.data)
                } else {
                    throw Error(res.data)
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

    return (
        <div>
            {error && <p>{error}</p>}
            <Loading loading={loading} />
            {postList && <Karma voteClicked={voteClicked} />}
            {postList && postList.slice(0).reverse().map((post, index) => {
                
                // Checks in users localstorage wich posts allready voted and change there style
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
            <VoteWindow className={classes.polygon} clicked={clicked} postIndex={postIndex} windowPost={windowPost} openHandler={openHandler} voteWinOpen={voteWinOpen} />
        </div>
    )
}

export default vote
