import jwt from "jsonwebtoken";
import ENV from "../../config/env.mjs";
import UserModel from "../models/user.model.mjs";
import AdminUserModel from "../models/admin.user.model.mjs";

const commonService = {
  createToken: async (uid) => {
    console.log("..create token service..");
    return new Promise((resolve, reject) => {
      try {
        const accessToken = jwt.sign({ uid: uid }, ENV.JWT_ACCESS_KEY, {
          expiresIn: ENV.JWT_ACCESS_KEY_EXPIRY,
          algorithm: "HS256",
        });
        const refreshToken = jwt.sign({ uid: uid }, ENV.JWT_REFRESH_KEY, {
          expiresIn: ENV.JWT_REFRESH_KEY_EXPIRY,
          algorithm: "HS256",
        });
        resolve({
          accessToken,
          refreshToken,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  renewAccessTokenService: async (req, uid, role = "user") => {
    const { token } = req.body;
    if (!token) {
      return {
        success: false,
        error: "Invalid token",
      };
    }

    return jwt.verify(token, ENV.JWT_REFRESH_KEY, async (err, response) => {
      if (err) {
        return {
          success: false,
          error: "Invalid token",
        };
      }
      if (response?.uid) {
        let user;
        if (role === "user") {
          user = await UserModel.findOne({
            where: { [uid]: response.uid },
          });
        } else if (role === "admin") {
          user = await AdminUserModel.findOne({
            where: { [uid]: response.uid },
          });
        }

        if (user) {
          const accessToken = jwt.sign(
            { uid: response.uid },
            ENV.JWT_ACCESS_KEY,
            {
              expiresIn: "1d",
            }
          );
          const refreshToken = jwt.sign(
            { uid: response.uid },
            ENV.JWT_REFRESH_KEY,
            {
              expiresIn: "1d",
            }
          );
          return {
            success: true,
            accessToken,
            refreshToken,
          };
        }

        return {
          success: false,
          error: "Invalid token",
        };
      }

      return {
        success: false,
        error: "Invalid token",
      };
    });
  },
};
export default commonService;
