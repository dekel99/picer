const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require ("cors")


const app = express();
app.use(cors({ origin: "*", credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){
    res.send("this is respond")
})





// Port Config **
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function() {
  console.log(`server started running on port: ${port}`);
});
