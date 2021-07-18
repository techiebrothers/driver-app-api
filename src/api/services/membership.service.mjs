import MembershipModel from "../models/membership.model.mjs";

const membershipService = {
  getAllMembershipService: async () => {
    console.log("..get all membership service..");
    try {
      let memberships = MembershipModel.findAll();
      if (memberships) {
        return {
          success: true,
          data: memberships,
        };
      } else {
        return {
          success: false,
          message: "Error while fetching memberships",
        };
      }
    } catch (error) {
      console.log("..get all membership service error..");
      console.log(error);
      return {
        success: false,
        message: "Internal server error please try again",
      };
    }
  },
};
export default membershipService;
