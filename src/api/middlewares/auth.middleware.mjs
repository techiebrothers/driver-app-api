import Joi from "joi";
import commonMiddleware from "./common.middleware.mjs";

const authMiddleware = {
  isAuthenticated: (req, res, next) => {
    console.log("authenticate middleware");
    next();
  },
  validateLogin: (req, res, next) => {
    console.log("..validate login middleware..");
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateSignup: (req, res, next) => {
    console.log("..validate signup middleware..");
    const schema = Joi.object({
      name: Joi.string().required(),
      mobile_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateSendOTP: (req, res, next) => {
    console.log("..validate send otp middleware..");
    const schema = Joi.object({
      mobile_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateVerifyOTP:(req,res,next)=>{
    console.log("..validate verify otp middleware..");
    const schema = Joi.object({
      otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
      mobile_number:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  }
};

export default authMiddleware;
