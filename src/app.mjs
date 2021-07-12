import app from "./config/express.mjs";
import logger from "./config/logger.mjs";
const { PORT, NODE_ENV } = process.env;

export const runServer = () => {
  app.listen(PORT || 8080, () => {
    logger.info(`Running on http://localhost:${PORT || 8080}`);
  });
};
