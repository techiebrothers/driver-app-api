import SQL from "sequelize";
import DB from "./index.mjs";

const UserCar = DB.define(
  "user_car",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    make: {
      type: SQL.STRING,
      allowNull: false,
    },
    model: {
      type: SQL.STRING,
      allowNull: false,
    },
    color: {
      type: SQL.STRING,
      allowNull: false,
    },
    registration_number: {
      type: SQL.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

UserCar.sync({ force: false })
  .then(() => console.log("user-car table initialized"))
  .catch((error) => {
    console.log("Error creating user-car table", error);
  });

export default UserCar;
