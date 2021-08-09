import Joi from "joi";
import commonMiddleware from "./common.middleware.mjs";

const userCarMiddleware = {
  validateAddUserCar: (req, res, next) => {
    console.log("..validate user car middleware..");
    const schema = Joi.object({
      userId: Joi.string().required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      color: Joi.string().required(),
      registrationNumber: Joi.string().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};
export default userCarMiddleware;
