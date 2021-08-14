import UserCarModel from "../models/userCar.model.mjs";

const userCarService = {
  addUserCarService: async ({ user_id, make, model, color, registration_number }) => {
    try {
      let userCarData = await UserCarModel.findOne({ where: { user_id } });
      if (userCarData) {
        // update model
        await UserCarModel.update(
          {
            make,
            model,
            color,
            registration_number,
          },
          { where: { user_id } }
        );
        return {
          success: true,
          mode:"update",
          message: "User car data updated successfully",
        };
      } else {
        // insert data
        await UserCarModel.create({
          user_id,
          make,
          model,
          color,
          registration_number,
        });
        return {
          success: true,
          mode:"add",
          message: "User car data added successfully",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message:"Internal server error, please try again",
      };
    }
  },
};

export default userCarService;
