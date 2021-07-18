import parkingService from "../services/parking.service.mjs";
const parkingController = {
  getAllParkings: async(req, res, next) => {
    console.log("parking status controller");
    let response = await parkingService.getAllParkings()
    console.log(response)
  },
  getAvailableParkings: (req, res, next) => {
    console.log("parking slots controller");
  },
  addParking:(req,res,next)=>{
    
  }
};

export default parkingController;
