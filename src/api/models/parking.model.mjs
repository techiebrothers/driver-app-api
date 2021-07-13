import SQL from "sequelize";
import DB from "./index.mjs";

const Parking = DB.define(
  "parking",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: {
      type: SQL.STRING,
      allowNull: false,
    },
    latitude:{
      type: SQL.STRING,
      allowNull: false,
    },
    longitude:{
      type: SQL.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Parking.sync({ force: false })
  .then(() => console.log("parking table initialized"))
  .catch((error) => {
    console.log("Error creating parking table", error);
  });

export default Parking;
