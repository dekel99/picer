import React, { useEffect, useState } from 'react'
import axios from "axios"
import PostCard from './PostCard'
import LoadingSmall from "./LoadingSmall"

function UserPosts() {

    const [loading, setLoading] = useState(false)
    const [userPosts, setUserPosts] = useState()
    const [err, setErr] = useState()

    function loadMyPosts(){
        setUserPosts()
        setLoading(true)
        axios({method: "GET", url: process.env.NEXT_PUBLIC_SERVER_URL + "/user-posts", withCredentials: true})
            .then(res => { 
                setLoading(false)
                
                if (res.data[0]){
                    setUserPosts(res.data)
                } else if(res.data===[]){
                    console.log("array is empty")
                } else {
                    throw Error (res.data)
                } 
            })
            .catch(err => {
                setErr(err.message)
            })
    }

    useEffect(() => {
        loadMyPosts()
    }, [])
    

    return(
        <div>
            <LoadingSmall loading={loading} regular={true} style={{marginTop: "200px"}}/>
            { err && <p>{err}</p> }
            {userPosts ? userPosts.slice(0).reverse().map((post, index) => {
                return(
                    <PostCard 
                        key={index}
                        name={post.name} 
                        title={post.title} 
                        images={post.images} 
                        description={post.description} 
                        time={post.time}
                        votes={post.votes}
                        postId={post._id}
                        active={post.active}
                        deletePost={true}
                        loadMyPosts={loadMyPosts}
                    />
                )
            }): loading ? null : err ? null :
            <div>
                <br/>
                <p>You do not have any posts yet...</p>
                <img src="https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?compress=1&resize=400x300"/>
            </div>}
        </div>
    )
}

export default UserPosts
