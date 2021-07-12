import authService from "../services/auth.service.mjs";

const authController = {
  login: async (req, res, next) => {
    try {
      console.log("..login controller..");
      let response = await authService.loginService();
      res.status(200).json({
        success: true,
        message: "Authenticated",
      });
    } catch (error) {
      console.log("..login controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
  signup: async (req, res, next) => {
    try {
      console.log("..signup controller..");
      const data = req.body;
      const response = await authService.signupService(data);
      if (response && response !== 'FAIL') {
        res.status(200).json({
          success: true,
          data:response,
          message: "User created successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
    } catch (error) {
      console.log("..signup controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
  sendOTP:(req,res,next)=>{
    try{
      console.log('...send otp controller..');
      // send otp function
      res.status(200).json({
        success:true,
        message:"OTP Sent successfully"
      })
    }
    catch(error){
      console.log('..send otp error..')
      console.log(error)
      res.status(500).json({
        success:false,
        error:"Error while sending otp, please try again"
      })
    }
  },
  verifyOTP:(req,res,next)=>{
    try{
      console.log('...verify otp controller..');
      // send otp function
      res.status(200).json({
        success:true,
        message:"OTP Verified successfully"
      })
    }
    catch(error){
      console.log('..verify otp error..')
      console.log(error)
      res.status(500).json({
        success:false,
        error:"Error while sending otp, please try again"
      })
    }
  }
};

export default authController;
