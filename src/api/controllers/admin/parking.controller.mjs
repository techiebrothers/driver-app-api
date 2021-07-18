import adminParkingService from "../../services/admin/parking.service.mjs";

const adminParkingController = {
  createParking: async (req, res, next) => {
    try {
      console.log("..admin add parking controller..");
      let response = await adminParkingService.createParkingService(req);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("..admin add parking controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },

};
export default adminParkingController;
