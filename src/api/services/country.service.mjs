import CountryModel from "../models/country.model.mjs";

const countryService = {
  getAllCountryService: async () => {
    try {
      console.log("..country service ..");
      let response = await CountryModel.findAll();
      if (response) return response;
      else return "FAIL";
    } catch (error) {
      console.log("..country service error..");
      console.log(error);
      return "FAIL";
    }
  },
};
export default countryService;
