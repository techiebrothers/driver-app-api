import SQL from "sequelize";
import DB from "./index.mjs";

const UserParking = DB.define(
  "user_parking",
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
    parking_id: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    parking_date: {
      type: SQL.DATE,
      allowNull: false,
    },
    pullout_date: {
      type: SQL.DATE,
      allowNull: false,
    },
    reminder_date:{
      type: SQL.DATE,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

UserParking.sync({ force: false })
  .then(() => console.log("user-parking table initialized"))
  .catch((error) => {
    console.log("Error creating user-parking table", error);
  });

export default UserParking;
