import express from "express";
import cors from 'cors'
const app=express();
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>res.send("API is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
const PORT=3000;  
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}.`)
})
export default app;





