import express from "express";
import membershipController from "../../controllers/membership.controller.mjs";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
const router = express.Router();

router
  .route("/get/all")
  .get(authMiddleware.isAuthenticated, membershipController.getAllMembership);

router
  .route("/create/payment-intent")
  .get(
    authMiddleware.isAuthenticated,
    membershipController.createPaymentIntent
  );

export default router;
