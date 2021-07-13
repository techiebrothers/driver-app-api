import CarModel from "../models/car.model.mjs";

const carService = {
  getAllCarService: async () => {
    try {
      console.log("..car service..");
      let response = await CarModel.findAll();
      if (response) {
        return {
          success: true,
          data: response,
        };
      } else
        return {
          success: false,
          message: "Internal server error",
        };
    } catch (error) {
      console.log("..car service error..");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
export default carService;
