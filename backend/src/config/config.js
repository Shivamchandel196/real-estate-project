import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in env");
}

if (!process.env.PORT) {
  console.warn("PORT not defined, using default 5000");
}


const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
 
};

export default config;