import express from 'express';
import userRouter from './routes/user.routes.js'
import authRouter from '../src/routes/auth.routes.js'




const app = express();


app.use(express.static("src/public"));
app.use(express.json());

app.use('/api',userRouter);
app.use('/api/auth',authRouter);




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});




export default app;