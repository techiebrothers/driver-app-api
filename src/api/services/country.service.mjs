import CountryModel from "../models/country.model.mjs";

const countryService = {
  getAllCountryService: async () => {
    try {
      console.log("..country service ..");
      let response = await CountryModel.findAll();
      if (response) return { success: true, data: response };
      else return { success: false, message: "Internal server error" };
    } catch (error) {
      console.log("..country service error..");
      console.log(error.message);
      return { success: false, message: error.message };
    }
  },
};
export default countryService;
