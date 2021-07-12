import express from "express";
import authRoutes from "./auth.routes.mjs";
import carRoutes from "./car.routes.mjs";
import countryRoutes from './country.routes.mjs'

const router = express.Router();
router.use("/user", authRoutes);
router.use("/car", carRoutes);
router.use("/country",countryRoutes)

export default router;
