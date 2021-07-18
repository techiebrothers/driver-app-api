import ParkingModel from "../../models/parking.model.mjs";
import { uploadFile } from "../../../config/s3.mjs";
const adminParkingService = {
  createParkingService: async (req) => {
    const { parkingName, address, lat, long } = req.body;
    try {
      let data;
      if (req.file) {
        let response = await uploadFile(req.file);
        data = {
          name: parkingName,
          address,
          latitude: lat,
          longitude: long,
          image: response.Location,
          isActive:true
        };
      } else if (!req.file) {
        data = {
          name: parkingName,
          address,
          latitude: lat,
          longitude: long,
          isActive:true
        };
      }
      let response = await ParkingModel.create(data);
      if (response) {
        return {
          success: true,
          data: response,
        };
      } else {
        return {
          success: false,
          message: "Error while creating parking",
        };
      }
    } catch (error) {
      console.log("..admin create parking service error..");
      console.log(error);
      return {
        success: false,
        message: "Internal server error, please try again",
      };
    }
  },
};
export default adminParkingService;
