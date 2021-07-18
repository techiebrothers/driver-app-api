import jwt from "jsonwebtoken";
import ENV from "../../config/env.mjs";
import UserModel from "../models/user.model.mjs";
import AdminUserModel from "../models/admin.user.model.mjs"

const commonMiddleware = {
  validateRequest: (req, res, next, schema) => {
    console.log(".. validate request middleware..");
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const message = `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`;
      return res.status(422).json({ success: false, error: message });
    }
    req.body = value;
    next();
  },
  validateToken: (req, res, next, uid, role = "user") => {
    console.log(".. validate token middleware..");
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({
        success: false,
        error: "Invalid token",
      });
    }

    if (!token || token.length === 0) {
      return res.status(403).json({
        success: false,
        error: "Invalid token",
      });
    }
    token = token && token.split(" ");
    token = token[1];
    jwt.verify(token, ENV.JWT_ACCESS_KEY, async (err, response) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: "Invalid token",
        });
      }
      if (response) {
        let actualUser
        if(role === 'user'){
           actualUser = await UserModel.findOne({
            where: { [uid]: response.uid },
          });
        }
        else if (role === 'admin'){
          actualUser = await AdminUserModel.findOne({
            where: { [uid]: response.uid },
          });
        }
        
        if (actualUser) {
          req.user = actualUser;
          next();
        } else {
          return res.status(403).json({
            success: false,
            error: "Invalid token",
          });
        }
      }
    });
  },
};
export default commonMiddleware;
