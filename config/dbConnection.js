const { default: mongoose} = require("mongoose");

const createConnection =()=>{
 mongoose.connect(process.env.Db_Url)
 
 .then(()=>{
    console.log(`Database Connected!`)})
 .catch((err)=>{throw err})
}
module.exports= createConnection;


