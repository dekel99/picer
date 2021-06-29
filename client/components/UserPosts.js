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
                if (res.data){
                    setUserPosts(res.data)
                    setLoading(false)
                } else {
                    throw Error ("You are not logged in or server couldn't fetch data")
                } 
            })
            .catch(err => {
                setLoading(false)
                setErr(err.message)
            })
    }, [])

    return(
        <div>
            <Loading loading={loading} />
            { err ? <p>{err}</p> : <h1>your posts</h1> }
            {userPosts && userPosts.slice(0).reverse().map((post, index) => {
                return(
                    <PostCard 
                        key={index}
                        name={post.name} 
                        title={post.title} 
                        images={post.images} 
                        description={post.description} 
                        time={post.time}
                        votes={post.votes}
                    />
                )
            })}
        </div>
    )
}

export default UserPosts
