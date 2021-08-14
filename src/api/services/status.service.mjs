import StatusModel from "../models/status.model.mjs";

const statusService = {
  getAllStatusService: async () => {
    try {
      console.log("get all status service");
      let response = await StatusModel.findAll();
      if (response) {
        return {
          success: true,
          data: response,
        };
      } else {
        return {
          success: false,
          data: null,
          message: "No status found",
        };
      }
    } catch (error) {
      console.log("get all status service error");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
export default statusService;
