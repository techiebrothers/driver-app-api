import ParkingModel from "../models/parking.model.mjs";
import UserParkingModel from "../models/userParking.model.mjs";

import DB from "../models/index.mjs";

const parkingService = {
  getAllParkingService: async (userId) => {
    console.log("get all parking service");
    try {
      const sql = `SELECT *,
      (SELECT count(*) as COUNT from "user_parking" up where up.parking_id = parking_id and up.user_id = ${userId} )  as "parkingUsedPreviouslyCount"
       from parking p `;
      let parkings = await DB.query(sql);
      if (parkings && parkings.length > 0) {
        return {
          success: true,
          data: parkings[0],
          message: "Parkings fetched successfully",
        };
      } else {
        return {
          success: false,
          data: null,
          message: "No parkings available",
        };
      }
    } catch (error) {
      console.log("get all parking service error");
      console.log(error);
      return {
        success: false,
        message: "Internal server error, please try again",
      };
    }
  },
  getAvailableParkingService: async () => {
    console.log("get all available parking service");
    try {
      const query =
        "select * from parking where id not in (select parking_id from user_parking)";
      const response = await DB.query(query);
      return {
        success: true,
        data: response[0],
      };
    } catch (error) {
      console.log("get all available parking service error");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
export default parkingService;
