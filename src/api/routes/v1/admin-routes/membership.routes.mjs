import express from "express";
import adminMembershipController from "../../../controllers/admin/membership.controller.mjs";
import adminUserMiddleware from "../../../middlewares/admin/user.middleware.mjs";
import adminMembershipMiddleware from "../../../middlewares/admin/membership.middleware.mjs";
const router = express.Router();

router
  .route("/create")
  .post(
    [
      adminUserMiddleware.isAuthenticated,
      adminMembershipMiddleware.validateCreateMembership,
    ],
    adminMembershipController.createMembership
  );

router
  .route("/get/all")
  .get(
    adminUserMiddleware.isAuthenticated,
    adminMembershipController.getAllMembership
  );

export default router;
