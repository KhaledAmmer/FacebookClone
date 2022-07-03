
const express = require("express");
const {sendFriendRequest,acceptFriendRequest,deleteFriendRequest,deleteFriend}= require("../controllers/users")
const authentication = require("../middleware/authentication");
 const friendRouter = express.Router();

friendRouter.post("/request",authentication,sendFriendRequest)

//* put Request 
friendRouter.put("/add",authentication,acceptFriendRequest)

//* delete Request
friendRouter.delete("/request/delete",authentication,deleteFriendRequest)
friendRouter.delete("/delete",authentication,deleteFriend)



module.exports = friendRouter