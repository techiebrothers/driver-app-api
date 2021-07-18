import SQL from "sequelize";
import DB from "./index.mjs";

const UserMembership = DB.define(
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
    membership_id: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    membership_date: {
      type: SQL.DATE,
      allowNull: false,
    },
    membership_expiry_date: {
      type: SQL.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

UserMembership.sync({ force: false })
  .then(() => console.log("user-membership table initialized"))
  .catch((error) => {
    console.log("Error creating user-membership table", error);
  });

export default UserMembership;
