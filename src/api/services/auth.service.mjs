import UserModel from "../models/user.model.mjs";
import jwt from "jsonwebtoken";
import ENV from "../../config/env.mjs";

const authService = {
  verifyOTPService: async (req) => {
    console.log("..verify otp service..");
    const { mobileNumber, otp } = req.body;
    let user = await UserModel.findOne({
      where: { mobileNumber },
    });

    if (!user) {
      //create user
      return authService.createUserService(mobileNumber);
    } else {
      // verify and login user
      const{accessToken,refreshToken} = await authService.createToken(mobileNumber)
      return{
        success:true,
        data:{
          ...user.dataValues,
          accessToken,
          refreshToken
        }
      }
    }
  },
  createToken: async (mobileNumber) => {
    console.log("..create token service..");
    return new Promise((resolve,reject)=>{
      try{
        const accessToken = jwt.sign({ uid: mobileNumber }, ENV.JWT_ACCESS_KEY, {
          expiresIn: ENV.JWT_ACCESS_KEY_EXPIRY,
          algorithm: "HS256",
        });
        const refreshToken = jwt.sign({ uid: mobileNumber }, ENV.JWT_REFRESH_KEY, {
          expiresIn: ENV.JWT_REFRESH_KEY_EXPIRY,
          algorithm: "HS256",
        });
        resolve({
          accessToken,
          refreshToken,
        })
      }
      catch(error){
        reject(error)
      }
    })
   
  },
  createUserService: async (mobileNumber) => {
    try {
      console.log("..create user service..");
      const { accessToken, refreshToken } =
        await authService.createToken(mobileNumber);
      let response = await UserModel.create({
        mobileNumber,
      });
      if (response) {
        return {
          success: true,
          data: {
            ...response.dataValues,
            accessToken,
            refreshToken,
          },
        };
      } else return { success: false, message: "Internal server error" };
    } catch (error) {
      console.log("..create user service error..");
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  },
  updateUserService: async (data) => {
    console.log("..update user service..");
    const { name, country, city,mobileNumber } = data;
    try{
      let user = await UserModel.findOne({
        where:{mobileNumber:mobileNumber}
      })
      if(user){
        let updatedUser = await user.update({
          name,country,city
        })
        if(updatedUser){
          return{
            success:true,
            message:"User information updated"
          }
        }
        else{
          return{
            success:false,
            error:"Error while updating user information"
          }
        }
      }
      else{
        return{
          success:false,
          error:"User not found"
        }
      }
    }
    catch(error){
      console.log("..update user service error..");
      console.log(error.message)
      return{
        success:false,
        error:error.message
      }
    }
  },
  renewAccessTokenService: async (req) => {
    const { token } = req.body;
    if (!token) {
      return {
        success: false,
        error: "Invalid token",
      };
    }

    return jwt.verify(token, ENV.JWT_REFRESH_KEY, async (err, response) => {
      if (err) {
        return {
          success: false,
          error: "Invalid token",
        };
      }
      if (response?.uid) {
        console.log(response.uid);
        let user = await UserModel.findOne({
          where: { mobileNumber: response.uid },
        });
        if (user) {
          const accessToken = jwt.sign(
            { uid: response.uid },
            ENV.JWT_ACCESS_KEY,
            {
              expiresIn: "1d",
            }
          );
          const refreshToken = jwt.sign(
            { uid: response.uid },
            ENV.JWT_REFRESH_KEY,
            {
              expiresIn: "1d",
            }
          );
          return {
            success: true,
            accessToken,
            refreshToken,
          };
        }

        return {
          success: false,
          error: "Invalid token",
        };
      }

      return {
        success: false,
        error: "Invalid token",
      };
    });
  },
};
export default authService;
