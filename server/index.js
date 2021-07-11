const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const passport = require("passport")
const LocalStrategy = require("passport-local")
const findOrCreate = require("mongoose-findorcreate")
const passportLocalMongoose = require("passport-local-mongoose")
const cors = require ("cors")
const multer = require('multer')
const fs = require('fs')
require("dotenv").config()

const app = express();
app.use(cors({ origin: process.env.REACT_APP_FRONT_URL, credentials: true})) // Enable getting requests from client
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions"
})
  
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
app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  // cookie: {
  //   secure: true
  // },
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

app.get("/posts", function(req, res){
  if(req.isAuthenticated()){

    Post.find((err, postList) =>{}).
      populate('postCreator').
        exec(function (err, postListWithUser) {
          if (err) return handleError(err);
          let newList = postListWithUser
          
          // Removes posts user allready voted for & and posts with post creator karma = 0 **
            newList.map((post, index) => {
              if (post.votes){
                if(post.votes.image1.includes(req.user.username) || post.votes.image2.includes(req.user.username) || post.postCreator.karma === 0 || post.active===false){
                  delete newList[index]
                }
              }
            })
            newList = newList.filter(Boolean) // Removes undefined elements from array
            res.json({success: true, newList: newList})
        })
  } else {
    res.json({success: false, message:"Please login and try again"})
  }
})

app.get("/vote/:postId/:imgVoted", function(req, res){
  const postId = req.params.postId
  const imgVoted = req.params.imgVoted
  let updatedVotes

  if(req.isAuthenticated()){

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
  } else {
    res.send("Please log in and try again")
  }
})

app.get("/pause-toggle/:postId", function(req, res){
  const postId = req.params.postId
  let toggleUpdate

  if(req.isAuthenticated()){
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
  }
})

app.get("/delete-post/:postId", function(req, res){
  const postId = req.params.postId
  
  if(req.isAuthenticated()){
    User.findOne({username: req.user.username}).
    populate('userPosts').
    exec(function (err, userWithPosts) {
      if (err) return handleError(err);

      userWithPosts.userPosts.map(post => {
        if(post._id == postId){
          try{
            const pathImg1 = post.images.image1.replace(process.env.REACT_APP_SERVER_URL, ".")
            const pathImg2 = post.images.image2.replace(process.env.REACT_APP_SERVER_URL, ".")  
            fs.unlinkSync(pathImg1)
            fs.unlinkSync(pathImg2)
          } catch(err){
            console.log(err + "dellete error")
          }

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
  }
})

app.get("/get-karma", function(req, res){
  if(req.isAuthenticated()){
    User.findOne({username: req.user.username}, (err, foundUser) => {
      if(!err){
        res.send({karma: foundUser.karma})
      }
    })
  }
})

app.get("/get-name", function(req, res){
  if(req.isAuthenticated()){
    User.findOne({username: req.user.username}, (err, foundUser) => {
      if(!err){
        res.send(foundUser.name)
      }
    })
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
    res.send("You are not logged in or server couldn't fetch data")
  }
})

app.get("/public/uploads/:picId", function(req, res){
  const picId = req.params.picId
  res.sendFile(__dirname + "/public/uploads/" + picId)
})

//------------------------------------POST ROUTS---------------------------------------

app.post("/register", function(req, res){
  const { password, confirm, name, username } = req.body

  if (!name) return res.json({success:false, message: "Please enter your name"})

  if (password===confirm){
    User.register({username: username}, password, function(err, user){
      if (err){
        if (err.message==="No username was given"){
          res.json({success: false, message: "Please enter a valid email"})
        } else if (err.message==="No password was given"){
          res.json({success: false, message: "Please enter a password"})
        } else {
          res.json({success: false, message: "Username allready exists"})
        }

      } else {
        passport.authenticate("local")(req, res, function() {
          User.findOneAndUpdate({username: username}, {name: name, karma: 10}, err => { 
            if (!err){
              res.json({success: true})
            }
          })
        })
      }
    })
  } else {
    res.json({success: false, message: "Passwords does not match"})
  }
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
        } catch {
          res.send("Required fields are empty")
        }
      })
    } else {
      res.send("Please login and try again")
    }
})

app.post("/change-name", function(req, res){
  if (req.isAuthenticated()){
    const newName = req.body.name
    if (!newName || newName.length<2) return res.json({success: false, message: "Name must be at least 2 characters"})

    User.findOneAndUpdate({username: req.user.username}, {name: newName}, err => {
      if(!err){
        res.json({success: true, message: "Name has changed"})
      } else {
        res.json({success: false, message: "Error occured"})
      }
    })
  } else {
    res.json({success: false, message: "Please login and try again"})
  }
})

app.post("/change-password", function(req, res){
  if (req.isAuthenticated()){
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
