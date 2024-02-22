const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// declaring server
const server = express();
//connectiong to database


function db(){mongoose.connect(process.env.DB).then(()=>{console.log("DB connection established")}).catch(err){console.error(err)}
};
function app(){
server.listen(process.env.PORT || Number(process.env.PORT +101),()=>console.log("server is on");
}
