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
      type: SQL.FLOAT,
      allowNull: false,
    },
    tax:{
      type: SQL.FLOAT,
      allowNull: true,
    },
    discount:{
      type: SQL.FLOAT,
      allowNull: true,
    },
    expiryMonths:{
      type: SQL.INTEGER,
      allowNull: false,
    },
    isActive:{
      type:SQL.BOOLEAN,
      allowNull:false,
      default:true
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
