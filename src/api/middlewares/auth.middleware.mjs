import Joi from "joi";
import commonMiddleware from "./common.middleware.mjs";

const authMiddleware = {
  isAuthenticated: (req, res, next) => {
    console.log("..validate authentication middleware..");
    commonMiddleware.validateToken(req, res, next, "mobileNumber", "user");
  },
  validateLogin: (req, res, next) => {
    console.log("..validate login middleware..");
    const schema = Joi.object({
      mobileNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      otp: Joi.string()
        .length(6)
        .pattern(/^[0-9]+$/)
        .required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateUpdateUser: (req, res, next) => {
    console.log("..validate signup middleware..");
    const schema = Joi.object({
      name: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateSendOTP: (req, res, next) => {
    console.log("..validate send otp middleware..");
    const schema = Joi.object({
      mobileNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateVerifyOTP: (req, res, next) => {
    console.log("..validate verify otp middleware..");
    const schema = Joi.object({
      otp: Joi.string()
        .length(4)
        .pattern(/^[0-9]+$/)
        .required(),
      mobileNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateRenewAccessToken: (req, res, next) => {
    console.log("..validate get access token middleware..");
    const schema = Joi.object({
      token: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};

export default authMiddleware;
