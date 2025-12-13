import express from "express";
import cors from 'cors'
import connectDB from "./configs/db.js";
const app=express();
await connectDB();
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>res.send("API is working"))
const PORT=3000;  
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}.`)
})
export default app;