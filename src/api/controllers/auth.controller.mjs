import authService from "../services/auth.service.mjs";

const authController = {
  updateUser: async (req, res, next) => {
    try {
      console.log("..update user controller..");
      const user = req.user
      if(user){
        const data ={
          mobileNumber:user?.dataValues?.mobileNumber,
          ...req.body
        }
        let response = await authService.updateUserService(data)
        if(response?.success){
          res.status(201).json({
            success:true,
            message:"User updated successfully"
          })
        }
        else{
          res.status(500).json({
            success:true,
            message:"Error while updating user"
          })
        }
      }
     
    } catch (error) {
      console.log("..update user controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
  sendOTP: (req, res, next) => {
    try {
      console.log("...send otp controller..");
      // send otp function
      res.status(200).json({
        success: true,
        message: "OTP Sent successfully",
      });
    } catch (error) {
      console.log("..send otp error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Error while sending otp, please try again",
      });
    }
  },
  verifyOTP: async(req, res, next) => {
    try {
      console.log("...verify otp controller..");
      let response = await authService.verifyOTPService(req)
      if(response?.success){
        return res.status(200).json({
          success: true,
          data:response.data
        });
      }
      return res.status(403).json({
        success: false,
        message: "Invalid mobile number or OTP",
      })
      
    } catch (error) {
      console.log("..verify otp error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Error while verifying otp, please try again",
      });
    }
  },
  renewAccessToken: async (req, res, next) => {
    console.log("..get access token middleware..");
    try {
      const response = await authService.renewAccessTokenService(req);
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
      console.log("..get access token middleware error..");
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};

export default authController;
