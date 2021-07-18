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
    name:{
      type: SQL.STRING,
      allowNull: false,
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
    },
    isActive:{
      type:SQL.BOOLEAN,
      allowNull:false,
      default:true
    },
    image:{
      type:SQL.STRING,
      allowNull:true,
    },
    rating:{
      type:SQL.STRING,
      allowNull:true,
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
