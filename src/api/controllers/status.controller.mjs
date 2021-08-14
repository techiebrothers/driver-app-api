import statusService from "../services/status.service.mjs";

const statusController = {
  getAllStatus: async (req, res, next) => {
    try {
      console.log("get all status controller");
      let response = await statusService.getAllStatusService();
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
          message: "Status fetched successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          data: null,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("get all status controller error");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default statusController;
