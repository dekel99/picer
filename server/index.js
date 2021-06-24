const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const findOrCreate = require("mongoose-findorcreate")
const passportLocalMongoose = require("passport-local-mongoose")
const cors = require ("cors")
const multer = require('multer')
require("dotenv").config()

const app = express();
app.use(cors({ origin: "*", credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
  
// CORS header config **

// app.use((req, res, next) => {
  //     res.setHeader("Access-Control-Allow-Origin", "*")
  //     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  //     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  //     next()
  // })
    

const storage = multer.diskStorage({
  destination: function(request, file, callback){ // Define file destenation 
    callback(null, "./public/uploads")
  },
  filename: function(request, file, callback){ // Define file name
    callback(null, Date.now() + file.originalname)
  }
})
    
const upload = multer({
  storage: storage,
  limit:{
    fieldSize: 1024*1024*3
  }
})


//--------------------------------PASSPORT + MONGOOSE CONFIG------------------------------
// Save session **
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect( process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})
mongoose.set("useCreateIndex", true)

postSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  images: Object,
  time: String
})

userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  posts: postSchema
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)


const User = new mongoose.model("User", userSchema)
const Post = new mongoose.model("Post", postSchema)

// Passport strategies **
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
//---------------------------------------------------------------------------------------

// Insert 2 posts if posts collections is empty (dev) **
Post.find((err, picerDB) =>{
  if (picerDB.length==0){
    defaultPost1 = new Post({ 
        username: "dekel", 
        title: "this is title", 
        description: "this is very long description .................", 
        time: "12:00", 
        images: {
            image1: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            image2: "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg"  
    },
    
  })

    defaultPost2 = new Post({
    username: "nadav", 
    title: "this is title", 
    description: "this is very long description .................", 
    time: "13:00", 
    images: {
      image1: "https://www.kaizend.co.il/wp-content/uploads/2019/09/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%9C%D7%94%D7%95%D7%A8%D7%93%D7%94-%D7%91%D7%97%D7%99%D7%A0%D7%9D-1-768x233.jpg",
      image2: "https://www.donet.co.il/wp-content/uploads/2018/01/Beautiful-Image-Database.jpg"
    } 
  })

    defaultPost1.save()
    defaultPost2.save()
  }
})

//------------------------------------GET ROUTS---------------------------------------

app.get("/", function(req, res){
    res.send("this is respond")
})

app.get("/posts", function(req, res){
  Post.find((err, postList) =>{
    if (!err){
      res.send(postList)
    }
  })
})

app.get("/public/uploads/:picId", function(req, res){
  const picId = req.params.picId
  res.sendFile(__dirname + "/public/uploads/" + picId)
})

//------------------------------------POST ROUTS---------------------------------------

app.post("/register", function(req, res){
  const { email, password, name } = req.body
  const username = email

  User.register({username: username}, password, function(err, user){
    if (err){
      res.send(err)
    } else {
      passport.authenticate("local")(req, res, function() {
        User.findOneAndUpdate({username: username}, {name: name}, err => { // Insert default pic to database on every new user
          if (err){
            console.log(err)
          } else {
            res.send("ok")
          }
        })
      })
    }
  })
})

app.post("/login", function(req, res){
  console.log(req.body)
})

app.post("/post-upload", upload.array("file"), function(req, res){
    // req.files, req.body.title, req.body.description

    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

    post = new Post({
      username: "dekel",
      title: req.body.title, 
      description: req.body.description,
      time: time,
      images: {
          image1: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[0].filename,
          image2: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[1].filename
      }
    })

    post.save()

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
