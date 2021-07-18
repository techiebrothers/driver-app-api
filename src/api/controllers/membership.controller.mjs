import membershipService from "../services/membership.service.mjs";

const membershipController = {
  getAllMembership: async (req, res, next) => {
    console.log("..get all membership controller..");
    try {
      let response = await membershipService.getAllMembershipService();
      if (response) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: false,
          data: response.message,
        });
      }
    } catch (error) {
      console.log("..get all membership controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error , please try again",
      });
    }
  },
};
export default membershipController;
