import UserModel from "../models/user.model.mjs";
import jwt from "jsonwebtoken";
import ENV from "../../config/env.mjs";
import commonService from './common.service.mjs'

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
      const { accessToken, refreshToken } = await commonService.createToken(
        mobileNumber
      );
      return {
        success: true,
        data: {
          ...user.dataValues,
          accessToken,
          refreshToken,
        },
      };
    }
  },
  
  createUserService: async (mobileNumber) => {
    try {
      console.log("..create user service..");
      const { accessToken, refreshToken } = await commonService.createToken(
        mobileNumber
      );
      let response = await UserModel.create({
        mobileNumber,
        isActive:true
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
    const { name, country, city, mobileNumber } = data;
    try {
      let user = await UserModel.findOne({
        where: { mobileNumber: mobileNumber },
      });
      if (user) {
        let updatedUser = await user.update({
          name,
          country,
          city,
        });
        if (updatedUser) {
          return {
            success: true,
            message: "User information updated",
          };
        } else {
          return {
            success: false,
            message: "Error while updating user information",
          };
        }
      } else {
        return {
          success: false,
          message: "User not found",
        };
      }
    } catch (error) {
      console.log("..update user service error..");
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  },
  
};
export default authService;
