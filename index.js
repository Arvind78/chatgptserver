const express = require("express");
 
const dotenv = require("dotenv").config();
const cors = require("cors");
const createConnection = require("./config/dbConnection");
const routes = require("./router/routes");
 
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",routes)
 
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
     const options ={
      method:"POST",
      headers:{
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": `${prompt}`
          }
        ]
    
      })
     }
  try {
    const response= await fetch("https://api.openai.com/v1/chat/completions",options)
    const result = await response.json();
    res.send({result:result.choices[0].message.content}) 
     
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

app.listen(process.env.Port,()=>{
    createConnection()
    console.log(`server started ${process.env.Port}`);
})

