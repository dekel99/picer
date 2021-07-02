import React, { useEffect, useState } from 'react'
import axios from "axios"
import PostCard from './PostCard'
import Loading from "./Loading"

function UserPosts() {

    const [loading, setLoading] = useState(false)
    const [userPosts, setUserPosts] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
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
    }, [])

    return(
        <div>
            <Loading loading={loading} />
            { err ? <p>{err}</p> : <h1>your posts</h1> }
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
                        deletePost={true}
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
