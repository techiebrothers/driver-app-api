import express from "express";
import authRoutes from "./auth.routes.mjs";
import carRoutes from "./car.routes.mjs";
import countryRoutes from './country.routes.mjs'
import parkingRoutes from './parking.routes.mjs'
import membershipRoutes from './membership.routes.mjs'
// admin routes
import adminUserRoutes from './admin-routes/user.routes.mjs'
import adminMembershipRoutes from './admin-routes/membership.routes.mjs'

const router = express.Router();
router.use("/user", authRoutes);
router.use("/car", carRoutes);
router.use("/country",countryRoutes)
router.use("/parking",parkingRoutes)
router.use("/membership",membershipRoutes)
// admin routes
router.use("/admin/user",adminUserRoutes)
router.use("/admin/membership",adminMembershipRoutes)


export default router;
