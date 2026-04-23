import express from "express";
import cors from "cors";
import multer from "multer";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

import uploadFile from "./services/storage.service.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post(
  "/post",
  upload.single("image"),

  async (req, res) => {

    try {

      console.log(req.body);
      console.log(req.file);

      const result = await uploadFile(
        req.file.buffer
      );

      return res.status(201).json({

        message: "Image Uploaded successfully",

        imageUrl: result.url,

      });

    } catch (error) {

      return res.status(500).json({

        success: false,
        message: error.message,

      });

    }

  }
);

app.use('/api/user',userRouter)
app.use("/api", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const message =
    err.message || "Internal Server Error";

  return res.status(statusCode).json({

    success: false,
    statusCode,
    message,

  });

});

export default app;