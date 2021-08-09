import userCarService from "../services/userCar.service.mjs";

const userCarController = {
  addUserCar: async (req, res, next) => {
    try {
      const { userId, make, model, color, registrationNumber } = req.body;

      let data = {
        user_id: userId,
        make,
        model,
        color,
        registration_number: registrationNumber,
      };

      let response = await userCarService.addUserCarService(data);
      if (response?.success && response?.mode === "add") {
        res.status(200).json({
          success: true,
          message: "User data added successfully",
        });
      }
      if (response?.success && response?.mode === "update") {
        res.status(204).json({
          success: true,
          message: "User data updated successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request",
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
};

export default userCarController;
