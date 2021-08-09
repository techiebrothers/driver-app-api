import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
import userCarMiddleware from "../../middlewares/userCar.middleware.mjs";
import userCarController from "../../controllers/userCar.controller.mjs";
const router = express.Router();

router
  .route("/add-car")
  .post(
    [authMiddleware.isAuthenticated, userCarMiddleware.validateAddUserCar],
    userCarController.addUserCar
  );

export default router;
