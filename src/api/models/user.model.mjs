import SQL from "sequelize";
import DB from "./index.mjs";

const User = DB.define(
  "user",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: SQL.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: SQL.STRING,
      allowNull: false,
      unique:true
    },
    country: {
      type: SQL.STRING,
      allowNull: false,
    },
    city: {
      type: SQL.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

User.sync({ force: false })
  .then(() => console.log("user table initialized"))
  .catch((error) => {
    console.log("Error creating user table", error);
  });

export default User;
