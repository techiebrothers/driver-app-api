import ParkingModel from "../models/parking.model.mjs";
import UserParkingModel from "../models/userParking.model.mjs";
const userParkingService = {
  addUserParkingService: async (req) => {
    console.log("add user parking service");
    try {
      const {
        latitude,
        longitude,
        userId,
        parkingDateTime,
        parkingId,
        pullOutDateTime,
      } = req.body;

      const saveUserParking = async (parkingId) => {
        try {
          console.log("add user parking service, saving user parking");

          let data = {
            user_id: userId,
            parking_id: parkingId,
            parking_date: parkingDateTime,
            pullout_date: pullOutDateTime,
          };
          let userParkingResponse = await UserParkingModel.create(data);
          if (userParkingResponse) {
            return {
              success: true,
              data: userParkingResponse,
            };
          } else {
            return {
              success: false,
              data: null,
              message: "Error while saving user parking",
            };
          }
        } catch (err) {
          console.log("add user parking service, saving user parking error");
          console.log(err);
          return {
            success: false,
            message: err.message,
          };
        }
      };

      if (parkingId === 0) {
        try {
          let response = await ParkingModel.create({
            latitude,
            longitude,
            isActive: true,
          });
          if (response?.dataValues) {
            let res = await saveUserParking(response.dataValues.id);
            if (res?.success) {
              return {
                success: true,
                data: res.data,
              };
            } else {
              return {
                success: false,
                data: null,
                message: "Error while saving user parking",
              };
            }
          }
        } catch (err) {
          console.log(err);
          return {
            success: false,
            message: "Error while saving user parking",
          };
        }
      } else {
        try {
          let res = await saveUserParking(parkingId);
          if (res?.success) {
            return {
              success: true,
              data: res.data,
            };
          } else {
            return {
              success: false,
              data: null,
              message: "Error while saving user parking",
            };
          }
        } catch (err) {
          console.log(err);
          return {
            success: false,
            data: "Error while saving user parking",
          };
        }
      }
    } catch (error) {
      console.log("add user parking service error");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
  setParkingStatusService: async (req) => {
    try {
      console.log("set parking status service");
      const { statusId, parkingId } = req;
      let isParkingPresent = await ParkingModel.findOne({
        where: {
          id: parkingId,
        },
      });
      if (isParkingPresent) {
        let response = await ParkingModel.update(
          {
            status_id: statusId,
          },
          {
            where: {
              id: parkingId,
            },
          }
        );
        if (response) {
          return {
            success: true,
            message: "Parking status updated successfully",
          };
        } else {
          return {
            success: false,
            message: "Error while updating parking status",
          };
        }
      } else {
        return {
          success: false,
          message: "Invalid parking id",
        };
      }
    } catch (error) {
      console.log("set parking status service error");
      console.log(error);
      return {
        success: "false",
        message: error.message,
      };
    }
  },
  setReminderService: async (req) => {
    try {
      console.log("set parking pullout reminder service");
      const { userParkingId, reminderDateTime } = req;
      let isUserParkingPresent = await UserParkingModel.findOne({
        where: {
          id: userParkingId,
        },
      });
      if (isUserParkingPresent) {
        let response = await UserParkingModel.update(
          {
            reminder_date: reminderDateTime,
          },
          {
            where: {
              id: userParkingId,
            },
          }
        );
        if(response){
          return{
            success:true,
            message:"Reminder set successfully"
          }
        }
        else{
          return{
            success:false,
            message:"Error while setting reminder"
          }
        }
      }
      else{
        return{
          success:false,
          message:"Invalid user parking id"
        }
      }
    } catch (error) {
      console.log("set parking pullout reminder service error");
      console.log(error);
      return {
        success: "false",
        message: error.message,
      };
    }
  },
};

export default userParkingService;
