import express from "express";

import { verifyToken } from "../utils/verifyUser.js";

import {
  createlisting,
  getListing,
  getListings,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

/* CREATE LISTING */

router.post(
  "/create",
  verifyToken,
  createlisting
);

/* GET ALL LISTINGS */

router.get(
  "/get",
  getListings
);

/* GET SINGLE LISTING */

router.get(
  "/get/:id",
  getListing
);

/* UPDATE LISTING */

router.post(
  "/update/:id",
  verifyToken,
  updateListing
);

/* DELETE LISTING */

router.delete(
  "/delete/:id",
  verifyToken,
  deleteListing
);

export default router;