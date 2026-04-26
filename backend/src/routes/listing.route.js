import express from'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createlisting,getListing,getListings,updateListing,deleteListing } from "../controllers/listing.controller.js";



const router = express.Router();








router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.post('/create',verifyToken,createlisting);
export default router;