import express from "express";
import countryController from "../../controllers/country.controller.mjs";

const router = express.Router();

router.route("/get-all").get(countryController.getAllCountry);


export default router;
