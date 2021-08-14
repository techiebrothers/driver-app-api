import userParkingService from "../services/userParking.service.mjs";

const userParkingController = {
  addUserParking: async (req, res, next) => {
    console.log("add user parking controller");
    try {
      let response = await userParkingService.addUserParkingService(req);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
          message: "User parking saved successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          data: null,
          message: "Error while saving user parking",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  setReminder: async (req, res, next) => {
    try {
      console.log("set reminder controller");
      let response = await userParkingService.setReminderService(req.body);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          message: "Reminder set successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("set reminder controller error");
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  setParkingStatus: async (req, res, next) => {
    try {
      console.log("set parking status controller");
      let response = await userParkingService.setParkingStatusService(req.body);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          message: "Parking status updated successfully",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("set parking status controller error");
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
};

export default userParkingController;
