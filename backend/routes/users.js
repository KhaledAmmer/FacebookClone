const express = require("express")
const authentication = require("../middleware/authentication")
const  friendRouter = require("./friend")
const {sendFriendRequest,register,getAllUsers ,getUserByUserName,acceptFriendRequest,deleteFriendRequest,deleteFriend,getUserById} = require("../controllers/users")

const userRouter = express.Router();

//* Get Request 
userRouter.get("/",authentication,getAllUsers)
userRouter.get("/:userId",authentication,getUserById)
userRouter.get("/search_1/:name",authentication,getUserByUserName)

//* Post Request
userRouter.post("/",register)

userRouter.use("/friend",friendRouter)

/* 
For nested routers create a middleware function that pass each param  with request as key:value to the next router
userRouter.use('/:userId/friend', function(req, res, next) {
  req.userId = req.params.userId;
  next()
}, friendRouter);


*/
// userRouter.post("/friend/request",authentication,sendFriendRequest)

// //* put Request 
// userRouter.put("/friend/add",authentication,acceptFriendRequest)

// //* delete Request
// userRouter.delete("/friend/request/delete",authentication,deleteFriendRequest)
// userRouter.delete("/friend/delete",authentication,deleteFriend)

module.exports = userRouter