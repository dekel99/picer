import React from 'react'
import PostCard from "../components/PostCard"
import styles from "../styles/vote.module.css"

const userPosts = [{
    username: "dekel", 
    title: "this is title", 
    description: "this is very long description .................", 
    time: "12:00", 
    images: {
        image1: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        image2: "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg"
    }    
},
{
    username: "nadav", 
    title: "this is title", 
    description: "this is very long description .................", 
    time: "13:00", 
    images: {
        image1: "https://www.kaizend.co.il/wp-content/uploads/2019/09/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%9C%D7%94%D7%95%D7%A8%D7%93%D7%94-%D7%91%D7%97%D7%99%D7%A0%D7%9D-1-768x233.jpg",
        image2: "https://www.donet.co.il/wp-content/uploads/2018/01/Beautiful-Image-Database.jpg"
    } 
},
{
    username: "dekel", 
    title: "this is title", 
    description: "this is very long description .................", 
    time: "14:00", 
    images: {
        image1: "https://ynet-images1.yit.co.il/picserver5/crop_images/2020/10/26/SJTmnfN00D/SJTmnfN00D_0_0_1778_1000_0_x-large.jpg",
        image2: "https://www.y4pc.co.il/images/jch-optimize/ng/images_Guides_01-18_free-stock-picture-photo-websites_free-stock-picture-photo-websites2.webp"
} 
}]

function vote() {
    return (
        <div>
            {userPosts.map(post => {
                return(
                    <PostCard 
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
