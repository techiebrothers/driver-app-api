import ParkingModel from "../models/parking.model.mjs";

const parkingService = {
  getAllParkingService: async () => {
    try {
      let parkings = await ParkingModel.findAll();
      if (parkings) {
        return {
          success: true,
          data: parkings,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: "Internal server error, please try again",
      };
    }
  },
};
export default parkingService;
