import express from "express";
import countryController from "../../controllers/country.controller.mjs";
import authMiddleware from "../../middlewares/auth.middleware.mjs";
const router = express.Router();

router.route("/get/all").get(authMiddleware.isAuthenticated,countryController.getAllCountry);


export default router;
