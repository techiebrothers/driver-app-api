import express from "express";
import authRoutes from "./auth.routes.mjs";
import carRoutes from "./car.routes.mjs";
import countryRoutes from "./country.routes.mjs";
import parkingRoutes from "./parking.routes.mjs";
import membershipRoutes from "./membership.routes.mjs";
import userCarRoutes from "./userCar.routes.mjs";
import userParkingRoutes from "./userParking.routes.mjs";
import statusRoutes from "./status.routes.mjs";
// admin routes
import adminUserRoutes from "./admin-routes/user.routes.mjs";
import adminMembershipRoutes from "./admin-routes/membership.routes.mjs";
import adminParkingRoutes from "./admin-routes/parking.routes.mjs";

const router = express.Router();
router.use("/user", authRoutes);
router.use("/car", carRoutes);
router.use("/country", countryRoutes);
router.use("/parking", parkingRoutes);
router.use("/membership", membershipRoutes);
router.use("/user-car", userCarRoutes);
router.use("/user-parking", userParkingRoutes);
router.use("/status", statusRoutes);
// admin routes
router.use("/admin/user", adminUserRoutes);
router.use("/admin/membership", adminMembershipRoutes);
router.use("/admin/parking", adminParkingRoutes);

export default router;
