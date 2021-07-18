import express from "express";
import adminUserController from "../../../controllers/admin/user.controller.mjs";
import adminUserMiddleware from "../../../middlewares/admin/user.middleware.mjs";

const router = express.Router();

router
  .route("/create")
  .post(adminUserMiddleware.validateCreateUser, adminUserController.createUser);

router
  .route("/login")
  .post(
    adminUserMiddleware.validateLogin,
    adminUserController.authenticateUser
  );

router
  .route("/token/renew")
  .post(
    adminUserMiddleware.validateRenewAccessToken,
    adminUserController.renewAccessToken
  );

router.route("/get/all")
.get(adminUserMiddleware.isAuthenticated,adminUserController.getAllUser)

export default router;
