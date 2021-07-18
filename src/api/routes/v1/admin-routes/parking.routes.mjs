import express from "express";
// middleware
import adminParkingMiddleware from "../../../middlewares/admin/parking.middleware.mjs";
import fileUploadMiddleware from "../../../middlewares/fileupload.middleware.mjs";
import adminUserMiddleware from "../../../middlewares/admin/user.middleware.mjs";
// controller
import adminParkingController from "../../../controllers/admin/parking.controller.mjs";
// import multer from 'multer'
const router = express.Router();
// var upload = multer({dest:'./upload/'});
router
  .route("/create")
  .post(
    [
      adminUserMiddleware.isAuthenticated,
      fileUploadMiddleware,
      adminParkingMiddleware.validateCreateParking,
    ],
    adminParkingController.createParking
  );
export default router;
