import express from "express";
import userParkingController from "../../controllers/userParking.controller.mjs";
import userParkingMiddleware from "../../middlewares/userParking.middleware.mjs";
import authMiddleware from "../../middlewares/auth.middleware.mjs";

const router = express.Router();

router
  .route("/add")
  .post(
    [authMiddleware.isAuthenticated, userParkingMiddleware.addUserParking],
    userParkingController.addUserParking
  );

router
  .route("/set-reminder")
  .post(
    [authMiddleware.isAuthenticated, userParkingMiddleware.setReminder],
    userParkingController.setReminder
  );

router
  .route("/set-status")
  .post(
    [authMiddleware.isAuthenticated, userParkingMiddleware.setParkingStatus],
    userParkingController.setParkingStatus
  );


export default router;
