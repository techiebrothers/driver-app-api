import AdminUserModel from "../../models/admin.user.model.mjs";
import commonService from "../common.service.mjs";
import bcrypt from "bcrypt";
import SQL from "sequelize";
const { Op } = SQL;
const adminUserService = {
  createUserService: async (req) => {
    try {
      console.log("..admin user service..");
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }
      console.log(email, password, username);
      let user = await AdminUserModel.findAll({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      if (user && user.length > 0) {
        return {
          success: false,
          message: "User already exists",
        };
      }
      let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());
      let data = {
        username,
        email,
        password: passwordHash,
        isActive: true,
      };
      let userCreated = await AdminUserModel.create(data);
      if (userCreated) {
        return {
          success: true,
          data: userCreated,
          message: "User created successfully",
        };
      } else {
        return {
          success: false,
          message: "Error while creating user",
        };
      }
    } catch (error) {
      console.log("..admin user service error..");
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  },
  authenticateUserService: async (req) => {
    const { email, password: userPassword, username } = req.body;
    if (!email || !userPassword) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
    let user;
    if (email) {
      user = await AdminUserModel.findOne({
        where: {
          email,
        },
      });
    } else if (username) {
      user = await AdminUserModel.findOne({
        where: {
          username,
        },
      });
    }

    if (user) {
      const {
        dataValues: { password },
      } = user;

      let isValidPassword = await bcrypt.compareSync(userPassword, password);

      if (isValidPassword) {
        let token = await commonService.createToken(email);
        if (token) {
          let data = {
            ...token,
            user: {
              ...user.dataValues,
            },
          };
          delete data.user.password;
          return {
            success: true,
            data,
          };
        } else {
          // token error
          return {
            success: false,
            message: "Error while authenticating user",
          };
        }
      } else {
        // invalid password
        return {
          success: false,
          message: "Invalid username or password",
        };
      }
    } else {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }
  },
  getAllUserService: async (req) => {
    console.log("..admin get all user service..");
    try {
      let users = await AdminUserModel.findAll({
        attributes: [
          "id",
          "username",
          "email",
          "roles",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      if (users && users.length > 0) {
        return {
          success: true,
          data: users,
        };
      } else {
        return {
          success: false,
          message: "Error while fetching users",
        };
      }
    } catch (error) {
      console.log("..admin get all user service error..");
      console.log(error);
      return {
        success: false,
        message: "Internal server error, please try again",
      };
    }
  },
};

export default adminUserService;
