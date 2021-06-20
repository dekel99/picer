const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require ("cors")
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

//*********************************************** */

app.get("/", function(req, res){
    res.send("this is respond")
})

app.post("/post", function(req, res){
    console.log(req.body)
    res.send("this is respond")
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
