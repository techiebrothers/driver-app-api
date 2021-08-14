import SQL from "sequelize";
import DB from "./index.mjs";

const Status = DB.define(
  "status",
  {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status_name: {
      type: SQL.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Status.sync({ force: false })
  .then(() => console.log("status table initialized"))
  .catch((error) => {
    console.log("Error creating status table", error);
  });

export default Status;
