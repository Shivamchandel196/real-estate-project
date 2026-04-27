import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.route.js";

import uploadFile from "./services/storage.service.js";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://real-estate-project-hazel-tau.vercel.app",
 "https://real-estate-project-hazel-tau.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("src/public"));

const upload = multer({
  storage: multer.memoryStorage(),
});

// IMAGE UPLOAD ROUTE
app.post(
  "/post",
  upload.single("image"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const result = await uploadFile(req.file.buffer);

      return res.status(201).json({
        success: true,

        message: "Image uploaded successfully",

        imageUrl: result.url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/listing", listingRouter);

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
