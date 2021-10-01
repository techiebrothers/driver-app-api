import membershipService from "../services/membership.service.mjs";
import Stripe from "stripe";
const { STRIPE_SECRET_KEY } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const membershipController = {
  getAllMembership: async (req, res, next) => {
    console.log("..get all membership controller..");
    try {
      let response = await membershipService.getAllMembershipService();
      if (response) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      } else {
        return res.status(200).json({
          success: false,
          data: response.message,
        });
      }
    } catch (error) {
      console.log("..get all membership controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error , please try again",
      });
    }
  },
  createPaymentIntent: async (req, res, next) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000,
        currency: "inr",
      });
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log("..create payment intent membership controller error..");
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error , please try again",
        error: error?.message || error?.response || error,
      });
    }
  },
};
export default membershipController;
