import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js'
import connectDb from './src/db/database.js'
import morgan from "morgan";


connectDb()



app.use(morgan("dev"));




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("server started")
})