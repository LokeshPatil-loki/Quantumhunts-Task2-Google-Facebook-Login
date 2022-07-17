const express = require("express");

const app = express();
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.listen(process.env.PORT || 5500, function(){
    console.log("Server started");
})