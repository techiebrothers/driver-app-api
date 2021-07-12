import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const dbConfig = require("./src/config/db.config.json");
const swaggerDocument = require("./src/config/swagger.json");

export { __dirname, dbConfig, swaggerDocument };
