import MembershipModel from "../../models/membership.model.mjs";

const adminMembershipService = {
  getAllMembershipService: async () => {
    try {
      console.log("..admin get all membership service..");
      let memberships = await MembershipModel.findAll();
      console.log(memberships);
      if (memberships && memberships.length > 0) {
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
      console.log("..admin get all membership service error..");
      console.log(error);
      return {
        success: false,
        message: "Internal server error, please try again",
      };
    }
  },
  createMembershipService: async (req) => {
    try {
      console.log("..admin create membership service..");
      const { planName, basePrice, tax, discount, expiryMonths } = req.body;
      if (!planName || !basePrice || !expiryMonths) {
        return {
          success: false,
          message: "Please enter all required fields",
        };
      }
      let data = {
        planName,
        basePrice,
        tax: tax || 0,
        discount: discount || 0,
        expiryMonths,
        isActive: true,
      };
      let response = await MembershipModel.create(data);
      if (response) {
        return {
          success: true,
          data: response,
        };
      } else {
        return {
          success: false,
          message: "Error while creating membership",
        };
      }
    } catch (error) {
      console.log("..admin create membership service error..");
      console.log(error);
      return {
        success: false,
        message: "Internal server error, please try again",
      };
    }
  },
};
export default adminMembershipService;
