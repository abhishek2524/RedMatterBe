// const mongoose = require("mongoose");
import mongoose from 'mongoose'
mongoose.connect(process.env.DB_URL as string,{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Database Connected',process.env.DB_URL))
.catch(err=>console.log(err));