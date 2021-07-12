import SQL from "sequelize";
import DB from "./index.mjs";

const Country = DB.define(
  "country",
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

Country.sync({ force: false })
  .then(() => console.log("country table initialized"))
  .catch((error) => {
    console.log("Error creating country table", error);
  });

export default Country;
