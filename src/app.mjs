import "dotenv/config"
import app from "./config/express.mjs";
import logger from "./config/logger.mjs";
const { PORT, NODE_ENV } = process.env;

export const runServer = () => {
  app.listen(PORT || 8080, () => {
    logger.info(`🚀 🚀 started on port - ${PORT || 8080}`);
  });
};
