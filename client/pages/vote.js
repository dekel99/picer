import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostCard from "../components/PostCard"
import styles from "../styles/vote.module.css"



function vote() {

    const [postList, setPostList] = useState()

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/posts").then(res => {setPostList(res.data)}).catch(err => {console.log(err)})
    }, [])

    return (
        <div>
            {postList && postList.slice(0).reverse().map((post, index) => {
                return(
                    <PostCard 
                        key={index}
                        username={post.username} 
                        title={post.title} 
                        images={post.images} 
                        description={post.description} 
                        time={post.time}
                    />
                )
            })}
        </div>
    )
}

export default vote
