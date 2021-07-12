import express from "express";
import carController from "../../controllers/car.controller.mjs";

const router = express.Router();

router.route("/get-all").get(carController.getAllCars);


export default router;
