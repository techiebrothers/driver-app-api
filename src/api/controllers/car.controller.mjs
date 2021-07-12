import carService from "../services/car.service.mjs";
const carController = {
  getAllCars: async (req, res, next) => {
    try {
      console.log("..car controller..");
      let response = await carService.getAllCarService();
      if (response && response !== "FAIL") {
        res.status(200).json({
          success: true,
          data: response,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error while fetching cars list",
        });
      }
    } catch (error) {
      console.log("..car controller error..");
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while fetching cars list",
      });
    }
  },
};
export default carController;
