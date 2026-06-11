import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.route.js";

import uploadFile from "./services/storage.service.js";
import {
  errorHandlerMiddleware,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";
import {
  compressionMiddleware,
  setCacheHeaders,
  etagMiddleware,
} from "./middleware/compression.middleware.js";
import { getPaginationParams } from "./middleware/pagination.middleware.js";
import { cacheMiddleware } from "./utils/cache.js";

const app = express();

// 🔒 Security Middleware
app.use(helmet()); // Add security headers

// 📦 Compression Middleware (before other middleware)
app.use(compressionMiddleware);

// 🚦 Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  skipSuccessfulRequests: true,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: "Too many uploads, please try again later",
});

app.use(limiter);

const allowedOrigins = [
  "http://localhost:5173",
  "https://real-estate-project-hazel-tau.vercel.app",
  "https://real-estate-project-hazel-tau.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// 💾 Cache Headers & ETag (for conditional requests)
app.use(etagMiddleware);
app.use(setCacheHeaders(3600)); // Cache for 1 hour

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
  uploadLimiter,
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

// 404 Not Found Handler
app.use(notFoundHandler);

// 🔴 Error Handler Middleware (MUST BE LAST)
app.use(errorHandlerMiddleware);

export default app;
