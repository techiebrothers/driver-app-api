import express from "express";
import statusController from "../../controllers/status.controller.mjs";
import authMiddleware from "../../middlewares/auth.middleware.mjs";

const router = express.Router();

router
  .route("/get/all")
  .get(authMiddleware.isAuthenticated, statusController.getAllStatus);

export default router;
