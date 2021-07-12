import CarModel from "../models/car.model.mjs";

const carService = {
  getAllCarService: async () => {
    try {
      console.log("..car service..");
      let response = await CarModel.findAll();
      if (response) {
        return response;
      } else return "FAIL";
    } catch (error) {
      console.log("..car service error..");
      console.log(error);
      return "FAIL";
    }
  },
};
export default carService;