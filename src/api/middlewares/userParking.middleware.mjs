import Joi from "joi";
import commonMiddleware from "./common.middleware.mjs";

const userParkingMiddleware = {
  addUserParking: (req, res, next) => {
    console.log("..validate add user parking middleware..");
    const schema = Joi.object({
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      userId: Joi.number().required(),
      parkingDateTime: Joi.date().required(),
      parkingId: Joi.number().required(),
      pullOutDateTime: Joi.date().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },

  setReminder: (req, res, next) => {
    console.log("..validate reminder middleware..");
    const schema = Joi.object({
      userParkingId: Joi.number().required(),
      reminderDateTime: Joi.date().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
  setParkingStatus: (req, res, next) => {
    console.log("..validate parking status middleware..");
    const schema = Joi.object({
      statusId: Joi.number().required(),
      parkingId: Joi.number().required(),
    });
    commonMiddleware.validateRequest(req, res, next, schema);
  },
};
export default userParkingMiddleware;
