import SQL from "sequelize";
import DB from "./index.mjs";

const Car = DB.define(
  "cars",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: SQL.JSON,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Car.sync({ force: false })
  .then(() => console.log("car table initialized"))
  .catch((error) => {
    console.log("Error creating car table", error);
  });

export default Car;
