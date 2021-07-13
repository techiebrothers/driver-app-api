import UserModel from "../models/user.model.mjs";

const authService = {
  loginService: async () => {
    let response = await UserModel.findOne({
      where: { name: "krunal" },
    });
  },
  signupService: async (data) => {
    console.log("..signup service..");
    const { name, mobileNumber, country, city } = data;
    const newUser = {
      name,
      mobileNumber,
      country,
      city,
    };
    try {
      let response = await UserModel.create(newUser);
      if (response) {
        return {
          success: true,
          data: response,
        };
      } else return { success: false, message: "Internal server error" };
    } catch (error) {
      console.log("..signup service error..");
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
export default authService;
