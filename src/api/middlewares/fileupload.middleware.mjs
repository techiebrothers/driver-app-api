import multer from "multer";

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
      console.log(req),
      console.log(file)
    callback(null, "");
  },
});
const upload = multer({ storage }).single("image");

export default upload;
