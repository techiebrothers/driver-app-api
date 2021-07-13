import SQL from "sequelize";
import DB from "./index.mjs";

const Membership = DB.define(
  "membership",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    planName: {
      type: SQL.STRING,
      allowNull: false,
    },
    basePrice:{
      type: SQL.NUMBER,
      allowNull: false,
    },
    tax:{
      type: SQL.NUMBER,
      allowNull: true,
    },
    discount:{
      type: SQL.NUMBER,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Membership.sync({ force: false })
  .then(() => console.log("membership table initialized"))
  .catch((error) => {
    console.log("Error creating membership table", error);
  });

export default Membership;
