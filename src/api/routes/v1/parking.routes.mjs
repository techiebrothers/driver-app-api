import express from "express";
import parkingController from "../../controllers/parking.controller.mjs";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
import parkingMiddleware from "../../middlewares/parking.middleware.mjs";
const router = express.Router();

router
  .route("/get/all")
  .get(authMiddleware.isAuthenticated, parkingController.getAllParkings);
router
  .route("/get/available")
  .get(authMiddleware.isAuthenticated, parkingController.getAvailableParkings);


export default router;
