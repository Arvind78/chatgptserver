 const express = require('express');
const { Signup, Login, forgetPassword } = require('../controller/userController');
 
 const routes = express.Router()
 routes.post("/signup",Signup)
 routes.post("/login",Login)
 routes.put("/forgot",forgetPassword)

 
 module.exports = routes;
 