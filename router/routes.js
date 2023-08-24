 const express = require('express');
const { Signup, Login, forgetPassword, Chat } = require('../controller/userController');
 
 const routes = express.Router()
 routes.post("/signup",Signup)
 routes.post("/login",Login)
 routes.post("/chat",Chat)
 routes.put("/forgot",forgetPassword)

 
 module.exports = routes;
 