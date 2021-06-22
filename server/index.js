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

app.post("/post", upload.single("file"), function(req, res){
    console.log(req.body.file[0])
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
