import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
import authController from "../../controllers/auth.controller.mjs";

const router = express.Router();

router.route("/login").post(authMiddleware.validateLogin, authController.login);

router
  .route("/signup")
  .post(authMiddleware.validateSignup, authController.signup);

router.route("/otp/send")
.post(authMiddleware.validateSendOTP,authController.sendOTP)

router.route("/otp/verify")
.post(authMiddleware.validateVerifyOTP,authController.verifyOTP)

export default router;
