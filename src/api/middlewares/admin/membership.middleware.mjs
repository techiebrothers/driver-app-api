import Joi from "joi";
import commonMiddleware from "../common.middleware.mjs";
const adminMembershipMiddleware = {
  
  validateCreateMembership: (req, res, next) => {
    console.log("..admin validate create user middleware..");
    const schema = Joi.object({
      planName: Joi.string().min(2).required(),
      basePrice: Joi.number().min(1).required(),
      expiryMonths: Joi.number().min(1).required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  
};
export default adminMembershipMiddleware;
