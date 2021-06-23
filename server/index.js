const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require ("cors")
const multer = require('multer')
require("dotenv").config()

const app = express();
app.use(cors({ origin: "*", credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
var postList = [{
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

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
//     next()
// })

// Multer storage config **
const storage = multer.diskStorage({
  destination: function(request, file, callback){ // Define file destenation 
    callback(null, "./public/uploads")
  },
  filename: function(request, file, callback){ // Define file name
    callback(null, Date.now() + file.originalname)
  }
})

// Upload config **
const upload = multer({
  storage: storage,
  limit:{
    fieldSize: 1024*1024*3
  }
})

//*********************************************** */

app.get("/", function(req, res){
    res.send("this is respond")
})

app.get("/posts", function(req, res){
  res.send(postList)
})

app.get("/public/uploads/:picId", function(req, res){
  const picId = req.params.picId
  res.sendFile(__dirname + "/public/uploads/" + picId)
})


app.post("/post-upload", upload.array("file"), function(req, res){
    // req.files, req.body.title, req.body.description

    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

    postList.unshift({
      username: "dekel", 
      title: req.body.title, 
      description: req.body.description, 
      time: time, 
      images: {
          image1: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[0].filename,
          image2: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[1].filename
      }    
    })
    setTimeout(function(){res.send("ok")},2000)

})



//************************************************* */

// Port Config **
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function() {
  console.log(`server started running on port: ${port}`);
});
