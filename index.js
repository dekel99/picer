const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const passport = require("passport")
const LocalStrategy = require("passport-local")
const findOrCreate = require("mongoose-findorcreate")
const passportLocalMongoose = require("passport-local-mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express();
app.use(cors({ origin: process.env.REACT_APP_FRONT_URL, credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const tokenSecret = process.env.ACCESS_TOKEN_SECRET

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions"
})
  
// ----------------------------------Check auth -------------------------------------------
function authToken(req, res, next){
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if(!token) return res.json({success: false, message:"Please login and try again"})

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) return res.json({success: false, message:"Please login and try again"})
    if (!req.user) req.user = {}
    req.user.username = user
    next()
  })
}

//--------------------------------PASSPORT + MONGOOSE CONFIG------------------------------
// Save session **
app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: process.env.production ? {secure: true, httpOnly: true, sameSite: "none"} : null , 
  store: store
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
  name: {type: String, required: true},
  title: String,
  description: String,
  images: {type: Object, required: true},
  time: String,
  votes: Object,
  active: Boolean,
  postCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  name: String,
  karma: {
    type: Number, 
    min: 0, 
    max: 30
  },
  userPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)


const User = new mongoose.model("User", userSchema)
const Post = new mongoose.model("Post", postSchema)

// Passport strategies **
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
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
        active: true,
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
    active: true,
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

app.get("/posts", authToken, function(req, res){
  Post.find((err, postList) =>{}).
    populate('postCreator').
      exec(function (err, postListWithUser) {
        if (err) return handleError(err);
        let newList = postListWithUser
        
        // Removes posts user allready voted for & and posts with post creator karma = 0 **
          newList.map((post, index) => {
            if (post.votes){
              if(post.votes.image1.includes(req.user.username) || post.votes.image2.includes(req.user.username) || post.postCreator.karma === 0 || post.active===false ){ // for user could not see hes own posts add this "|| post.postCreator._id==req.user.id"
                delete newList[index]
              }
            }
          })
          newList = newList.filter(Boolean) // Removes undefined elements from array
          res.json({success: true, newList: newList})
      })
})

app.get("/vote/:postId/:imgVoted", authToken, function(req, res){
  const postId = req.params.postId
  const imgVoted = req.params.imgVoted
  let updatedVotes

  // Finds post creator and -1 hes karma
  Post.findById(postId, (err, post) => {}).
    populate('postCreator').
    exec(function (err, postWithUser) {
      if (err) return handleError(err);

      if(postWithUser.postCreator.karma !== 0){
        User.findOneAndUpdate({_id: postWithUser.postCreator._id}, {karma: postWithUser.postCreator.karma - 1}, err => {
          if (!err){
  
            // Finds the post the user voted for and update it **
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
      
                  // Updates the karma of the user voted **
                  User.findOne({username: req.user.username}, (err, foundUser) => {
                    if(!err && foundUser.karma < 30){
                      User.findOneAndUpdate({username: req.user.username}, {karma: foundUser.karma + 1}, err => {
                        if(err){
                          console.log(err)
                        }
                      })
                    }
                  })
                }
              })
            } catch(err) {res.send(err)}
          })
        }
      })
    }
  });  
})

app.get("/pause-toggle/:postId", authToken, function(req, res){
  const postId = req.params.postId
  let toggleUpdate

  User.findOne({username: req.user.username}).
  populate('userPosts').
  exec(function (err, userWithPosts) {
    if (err) return handleError(err);
    userWithPosts.userPosts.map(post => {
      if(post._id == postId){
        if (post.active===true){
          toggleUpdate = false
        } else {
          toggleUpdate = true
        }
        Post.findOneAndUpdate({ _id: postId }, {active: toggleUpdate} ,err => {
          if (!err){
            res.send("active: " + toggleUpdate)
          } else {
            res.send(err)
          }
        })
      }
    })
  });
})

app.get("/delete-post/:postId", authToken, function(req, res){
  const postId = req.params.postId
  
  User.findOne({username: req.user.username}).
  populate('userPosts').
  exec(function (err, userWithPosts) {
    if (err) return handleError(err);

    userWithPosts.userPosts.map(post => {
      if(post._id == postId){
        Post.deleteOne({ _id: postId }, (err) => {
          if (!err){
            res.send("Post deleted")
          } else {
            res.send(err)
          }
        })
      }
    })
  });
})

app.get("/get-karma", authToken, function(req, res){
  User.findOne({username: req.user.username}, (err, foundUser) => {
    if(!err){
      res.send({karma: foundUser.karma})
    }
  })
})

app.get("/get-name", authToken, function(req, res){
  User.findOne({username: req.user.username}, (err, foundUser) => {
    if(!err){
      res.send(foundUser.name)
    }
  })
})

app.get("/check-auth", authToken, function(req, res){
  res.json({success: true})
})


app.get("/get-results/:postId", authToken, function(req, res){
  const postId = req.params.postId

  Post.find({_id: postId}, (err, foundPost) => {
    res.send(foundPost[0].votes)
  })  
})

app.get("/user-posts", authToken, function(req, res){
  User.
  findOne({ username: req.user.username }).
  populate('userPosts').
  exec(function (err, userWithPosts) {
    if (err) return handleError(err);
    res.send(userWithPosts.userPosts)
  });
})

app.get("/public/uploads/:picId", function(req, res){
  const picId = req.params.picId
  res.sendFile(__dirname + "/public/uploads/" + picId)
})

//------------------------------------POST ROUTS---------------------------------------

app.post("/register", function(req, res){
  const { password, confirm, name, username } = req.body

  if (!name) return res.json({success:false, message: "Please enter your name"})
  if (password !== confirm) return res.json({success:false, message: "Passwords not match"})

  User.register({username: username}, password, function(err, user){
    if (err) return res.json({success: false, message: err.message}) 

    passport.authenticate("local")(req, res, function() {
      const accessToken = jwt.sign(username, tokenSecret)
      User.findOneAndUpdate({username: username}, {name: name, karma: 10}, err => { 
        if (!err) res.header("authorization", accessToken).json({success: true, accessToken})
      })
    })
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
            const accessToken = jwt.sign(username, tokenSecret)
            res.header("authorization", accessToken).json({success: true, accessToken})

            // res.send("ok")
          })
        }
      })
      (req, res, function() {
        res.send("ok")
      })
    }
  })
})

app.post("/post-upload", authToken, function(req, res){
    // req.files, req.body.title, req.body.description

    // if(req.isAuthenticated()){
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
              image1: req.body.urlImage1,
              image2: req.body.urlImage2
            },
            votes: {image1: [], image2: []},
            active: true,
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
        } catch (err) {
          console.log(err)
          res.send("Required fields are empty")
        }
      })
    // } else {
    //   res.send("Please login and try again")
    // }
})

app.post("/change-name", authToken, function(req, res){
  // if (req.isAuthenticated()){
    const newName = req.body.name
    if (!newName || newName.length<2) return res.json({success: false, message: "Name must be at least 2 characters"})

    User.findOneAndUpdate({username: req.user.username}, {name: newName}, err => {
      if(!err){
        res.json({success: true, message: "Name has changed"})
      } else {
        res.json({success: false, message: "Error occured"})
      }
    })
  // } else {
  //   res.json({success: false, message: "Please login and try again"})
  // }
})

app.post("/change-password", authToken, function(req, res){
  // if (req.isAuthenticated()){
    const {newPass, currentPass, confirmPass} = req.body

    if (newPass===confirmPass){
      req.user.changePassword(currentPass, newPass, (err) => {
        if(!err){
          res.json({success: true, message: "Password has changed"})
        } else {
          if (err.message === "Password or username is incorrect"){
            res.json({success: false, message: "Password is incorrect"})
          } else {
            res.json({success: false, message: "Required fields are empty"})
          }
        }
      })
    } else {
      res.json({success: false, message: "Passwords does't match"})
    }
  // }
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
