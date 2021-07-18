import Joi from "joi";
import commonMiddleware from "../common.middleware.mjs";
const adminParkingMiddleware = {
  validateCreateParking: (req, res, next) => {
    console.log("..admin validate create parking middleware..");
    const schema = Joi.object({
      parkingName: Joi.string().required(),
      address: Joi.string().required(),
      lat: Joi.string().required(),
      long:Joi.string().required(),
      image:Joi.any().optional()
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};

export default adminParkingMiddleware