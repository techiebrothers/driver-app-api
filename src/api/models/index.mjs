import "dotenv/config"
import SQL from "sequelize";
import { dbConfig } from "../../../globalExports.mjs";
const ENV = process.env.NODE_ENV || "dev";
// const ENV = 'test'
const params = dbConfig[ENV];
const connectionString = `postgres://${params.username}:${params.password}@${params.host}:${params.port}/${params.database}`
const DB = new SQL(connectionString, {
  define: {
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
export default DB;
