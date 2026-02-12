import express from "express"
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json());

app.use(cors(
  {origin:"https://ai-assistant-hnho.onrender.com",
    credentials:true
  }
))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get("/",async(req,res)=>{
  let prompt=req.query.prompt
  let data= await geminiResponse(prompt);
  res.json(data) 
})

app.listen(port, () => {
  connectDB()
  console.log(`http://localhost:${port}`);

});
