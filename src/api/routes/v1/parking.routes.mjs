import express from "express";
import parkingController from "../../controllers/parking.controller.mjs";

const router = express.Router();

router.route("/get/all").get(parkingController.getAllParkings);
router.route("/get/available").get(parkingController.getAvailableParkings);


export default router;
