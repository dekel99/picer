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
app.use(cors({ origin: process.env.REACT_APP_FRONT_URL, credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
  
// CORS header config **

// app.use((req, res, next) => {
//       res.setHeader("Access-Control-Allow-Origin", procces.env,REACT_APP_FRONT_URL + "/register")
//       res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//       res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
//       next()
//   })
    

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
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
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
  name: String,
  title: String,
  description: String,
  images: Object,
  time: String,
  votes: Object,
  postCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  name: String,
  userPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
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
        name: "dekel", 
        title: "this is title", 
        description: "this is very long description .................", 
        time: "12:00", 
        images: {
            image1: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            image2: "https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg"  
    },
    
  })

    defaultPost2 = new Post({
    name: "nadav", 
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

  if(req.isAuthenticated()){
    Post.find((err, postList) =>{
      if (!err){
        let newList = postList

        // Removes posts user allready voted for **
        // newList.map((post, index) => {
        //   if (post.votes){
        //     if(post.votes.image1.includes(req.user.username) || post.votes.image2.includes(req.user.username)){
        //       delete newList[index]
        //     }
        //   }
        // })
        // newList = newList.filter(Boolean) // Removes undefined elements from array
        res.send(newList)
      }
    })
  } else {
    res.send("Please login and try again")
  }
})

app.get("/vote/:postId/:imgVoted", function(req, res){
  const postId = req.params.postId
  const imgVoted = req.params.imgVoted
  let updatedVotes

  if(req.isAuthenticated()){
      Post.findById(postId, (err, post) => {
      try{
        if (imgVoted==="image1"){
          updatedVotes = {image1: [...post.votes.image1, req.user.username], image2: [...post.votes.image2]}
        } else {
          updatedVotes = {image1: [...post.votes.image1], image2: [...post.votes.image2, req.user.username]}
        }
        
        Post.findOneAndUpdate({_id: postId}, {votes: updatedVotes}, err =>{
          if(!err){
            res.send("ok")
          }
        })
      } catch(err) {res.send(err)}
    })  
  } else {
    res.send("Please log in and try again")
  }
})

app.get("/check-auth", function(req, res){
  if(req.isAuthenticated()){
    res.send(true)
  } else {
    res.send(false)
  }
})

app.get("/logout", function(req, res){
  req.logout()
  res.send("logout")
})

app.get("/get-results/:postId", function(req, res){
  const postId = req.params.postId

  if(req.isAuthenticated()){
    Post.find({_id: postId}, (err, foundPost) => {
      res.send(foundPost[0].votes)
    })  
  } else {

  }
})


app.get("/user-posts", function(req, res){
  
  if(req.isAuthenticated()){
    User.
    findOne({ username: req.user.username }).
    populate('userPosts').
    exec(function (err, userWithPosts) {
      if (err) return handleError(err);
      res.send(userWithPosts.userPosts)
    });
  } 
  else {
    res.send("auth fail")
  }
})

app.get("/public/uploads/:picId", function(req, res){
  const picId = req.params.picId
  res.sendFile(__dirname + "/public/uploads/" + picId)
})

//------------------------------------POST ROUTS---------------------------------------

app.post("/register", function(req, res){
  const {  password, name, username } = req.body

  User.register({username: username}, password, function(err, user){
    if (err){
      res.send("Username allready exists")
    } else {
      passport.authenticate("local")(req, res, function() {
        User.findOneAndUpdate({username: username}, {name: name}, err => { 
          if (!err){
            res.send("ok") 
          }
        })
      })
    }
  })
})

app.post("/login", function(req, res){
  const { username , password } = req.body

  const user = new User({
    username: username,
    password: password
  })

  req.login(user,function(err){
    if(err){
      console.log(err)
    } else {
      passport.authenticate("local", function (err, user, info){
        if (!user) {
          res.send("Email or password is incorrect")
        } else {
          req.logIn(user, function() {
            res.send("ok")
          })
        }
      })
      (req, res, function() {
        res.send("ok")
      })
    }
  })
})

app.post("/post-upload", upload.array("file"), function(req, res){
    // req.files, req.body.title, req.body.description

    if(req.isAuthenticated()){
      const time = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });
      
      // Find users name and updates it with the post **
      User.find({username: req.user.username}, (err, foundUser) => {

        try{
          post = new Post({
            _id: new mongoose.Types.ObjectId(),
            name: foundUser[0].name,
            title: req.body.title === "undefined" ? "" : req.body.title, 
            description: req.body.description === "undefined" ? "" : req.body.description,
            time: time,
            images: {
              image1: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[0].filename,
              image2: process.env.REACT_APP_SERVER_URL + "/public/uploads/" + req.files[1].filename
            },
            votes: {image1: [], image2: []},
            postCreator: foundUser[0]._id
          })
  
          post.save()

          let postList = []

          if (foundUser[0].userPosts[0]){
            foundUser[0].userPosts.map(post => {
              postList.push(post._id)
            })
          }
          postList.push(post._id)

          User.findOneAndUpdate({username: req.user.username}, {userPosts: postList.flat()}, err => { 
            if (!err){
              res.send("ok") 
            }
          })
        } catch {
          res.send("Required fields are empty")
        }
      })
    } else {
      res.send("Please login and try again")
    }
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
