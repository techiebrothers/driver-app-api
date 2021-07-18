import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
import authController from "../../controllers/auth.controller.mjs";

const router = express.Router();

router
  .route("/update")
  .post(
    [authMiddleware.validateUpdateUser, authMiddleware.isAuthenticated],
    authController.updateUser
  );

router
  .route("/otp/send")
  .post(authMiddleware.validateSendOTP, authController.sendOTP);

router
  .route("/otp/verify")
  .post(authMiddleware.validateVerifyOTP, authController.verifyOTP);

router
  .route("/token/renew")
  .post(
    authMiddleware.validateRenewAccessToken,
    authController.renewAccessToken
  );

export default router;
