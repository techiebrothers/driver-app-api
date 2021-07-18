import Joi from "joi";
import commonMiddleware from "../common.middleware.mjs";
const adminUserMiddleware = {
  isAuthenticated: (req, res, next) => {
    console.log("..validate authentication middleware..");
    commonMiddleware.validateToken(req, res, next,'email','admin');
  },
  validateCreateUser: (req, res, next) => {
    console.log("..admin validate create user middleware..");
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      username: Joi.string().min(6).required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateLogin: (req, res, next) => {
    console.log("..admin validate login middleware..");
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().length(6).required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  validateRenewAccessToken: (req, res, next) => {
    console.log("..admin validate get access token middleware..");
    const schema = Joi.object({
      token: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};
export default adminUserMiddleware;
