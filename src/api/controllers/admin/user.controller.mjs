import adminUserService from "../../services/admin/user.service.mjs";
import commonService from "../../services/common.service.mjs";

const adminUserController = {
  createUser: async (req, res, next) => {
    console.log("..admin create user controller..");
    try {
      let response = await adminUserService.createUserService(req);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            response?.message || "Internal server error, please try again",
        });
      }
    } catch (error) {
      console.log("..admin create user controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  authenticateUser: async (req, res, next) => {
    console.log("..admin authenticate user controller..");
    try {
      let response = await adminUserService.authenticateUserService(req);
      if (response?.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("..admin authenticate user controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
  renewAccessToken: async (req, res, next) => {
    console.log("..admin get access token controller..");
    try {
      const response = await commonService.renewAccessTokenService(
        req,
        "email",
        "admin"
      );
      if (response?.success) {
        const { accessToken, refreshToken } = response;
        res.status(200).json({
          success: true,
          accessToken,
          refreshToken,
        });
      } else {
        res.status(403).json({
          success: false,
          error: "Invalid token",
        });
      }
    } catch (error) {
      console.log("..admin get access token controller error..");
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
  getAllUser: async (req, res, next) => {
    console.log("..admin get all user controller..");
    try {
      let response = await adminUserService.getAllUserService();
      if (response) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("..admin get all user controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, please try again",
      });
    }
  },
};

export default adminUserController;
