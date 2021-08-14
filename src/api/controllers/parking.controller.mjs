import parkingService from "../services/parking.service.mjs";
const parkingController = {
  getAllParkings: async (req, res, next) => {
    console.log("parking status controller");
    try {
      console.log(req.user);
      if (req?.user?.dataValues) {
        const {
          user: {
            dataValues: { id },
          },
        } = req;
        console.log(id);
        let response = await parkingService.getAllParkingService(id);
        if (response?.success) {
          res.status(200).json({
            success: true,
            data: response?.data,
            message: response.message,
          });
        } else {
          res.status(200).json({
            success: true,
            data: null,
            message: response.message,
          });
        }
      } else {
        return res.status(403).json({
          success: false,
          message: "Invalid user",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  getAvailableParkings: async (req, res, next) => {
    console.log("get available parking controller");
    try {
      let response = await parkingService.getAvailableParkingService();
      if (response?.success) {
        res.status(200).json({
          success: true,
          data: response.data,
          message: "Parkings fetched successfully",
        });
      } else {
        res.status(200).json({
          success: false,
          data: null,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("get available parking controller error");
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error,please try again",
      });
    }
  },
};

export default parkingController;
