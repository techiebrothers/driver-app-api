import { r } from "tar";
import adminMembershipService from "../../services/admin/membership.service.mjs";

const adminMembershipController = {
  createMembership: async (req, res, next) => {
    try {
      console.log("..admin create membership controller..");
      let response = await adminMembershipService.createMembershipService(req);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("..admin create membership controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  getAllMembership: async (req, res, next) => {
    try {
      console.log("..admin get all membership controller..");
      let response = await adminMembershipService.getAllMembershipService();
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("..admin get all membership controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
};

export default adminMembershipController;