import countryService from "../services/country.service.mjs";

const countryController = {
  getAllCountry: async(req, res, next) => {
    try {
      console.log("..country controller..");
      let response = await countryService.getAllCountryService();
      if (response && response !== "FAIL") {
        res.status(200).json({
          success: true,
          data: response,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Error while fetching countries",
        });
      }
    } catch (error) {
      console.log("..country controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Error while fetching countries",
      });
    }
  },
};
export default countryController;
