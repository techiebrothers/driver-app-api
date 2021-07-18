import Joi from "joi";
import commonMiddleware from "./common.middleware.mjs";

const parkingMiddleware = {
  validateAddParking: (req, res, next) => {
    console.log("..validate signup middleware..");
    const schema = Joi.object({
      address: Joi.string().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};
export default parkingMiddleware;
