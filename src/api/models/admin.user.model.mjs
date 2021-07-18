import SQL from "sequelize";
import DB from "./index.mjs";

const AdminUser = DB.define(
  "admin_user",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: SQL.STRING,
      allowNull: false,
      unique:true
    },
    email: {
      type: SQL.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: SQL.STRING,
      allowNull: false,
    },
    roles: {
      type: SQL.JSON,
      allowNull: true,
    },
    isActive: {
      type: SQL.BOOLEAN,
      allowNull: false,
      default: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

AdminUser.sync({ force: false })
  .then(() => console.log("admin-user table initialized"))
  .catch((error) => {
    console.log("Error creating admin-user table", error);
  });

export default AdminUser;
