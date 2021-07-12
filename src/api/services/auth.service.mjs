import UserModel from "../models/user.model.mjs";

const authService = {
  loginService: async () => {
    let response = await UserModel.findOne({
      where: { name: "krunal" },
    });
    console.log(response);
  },
  signupService: async (data) => {
    console.log('..signup service..')
    const { name, mobile_number, country, city } = data;
    const newUser = {
      name,
      mobile_number,
      country,
      city,
    };
    try {
      let response = await UserModel.create(newUser);
      if (response) {
        return response;
      } else return "FAIL";
    } catch (error) {
      console.log('..signup service error..')
      console.log(error);
      return "FAIL";
    }
  },
};
export default authService;
