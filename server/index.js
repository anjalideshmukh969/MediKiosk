import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";


dotenv.config();
const app = express();


// //middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet()) // helmet sets safe HTTP response headers It is a quick first layer of protection against common web attacks. It does not replace proper validation or auth.
app.use(cors({ 
    origin: process.env.CLIENT_URL,
credentials: true }
));
//routes
app.get("/health", (req,res)=>{
    res.status(200).json({
        status : "ok",
        time : new Date().toISOString()
    });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => { //Start listening only after connectDB() succeeds
    app.listen(PORT ,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
});
