const express = require("express");
 
const dotenv = require("dotenv").config();
const cors = require("cors");
const createConnection = require("./config/dbConnection");
const routes = require("./router/routes");
 
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",routes)
 
app.listen(process.env.Port,()=>{
    createConnection()
    console.log(`server started ${process.env.Port}`);
})

