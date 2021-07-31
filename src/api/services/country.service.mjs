import CountryModel from "../models/country.model.mjs";

const countryService = {
  getAllCountryService: async () => {
    try {
      console.log("..country service ..");
      let response = await CountryModel.findAll();
      if (response) {
        let modifiedData = [];
        Object.keys(response[0].dataValues.data).map((item, _) => {
          modifiedData.push({
            country: item,
            state: [...response[0].dataValues.data[item]],
          });
        });
        return { success: true, data: modifiedData };
      } else return { success: false, message: "Internal server error" };
    } catch (error) {
      console.log("..country service error..");
      console.log(error.message);
      return { success: false, message: error.message };
    }
  },
};
export default countryService;
