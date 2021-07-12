import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import compress from "compression";
import methodOverride from "method-override";
import helmet from "helmet";
import routes from "../api/routes/v1/index.mjs";
import DB from "../api/models/index.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDocument } from "../../globalExports.mjs";
import swaggerUI from "swagger-ui-express";
const app = express();

const swaggerOptions = {
  definition: {
    info: {
      title: "Parking app api",
      version: "1.0.0",
    },
  },
  apis: ["*.mjs"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//request logging
app.use(morgan("dev"));

// parse body params and attach them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//gzip compression
app.use(compress());

//override http verbs such as PUT and delete
app.use(methodOverride());

//secure apps by setting some specific headers
app.use(helmet());

//enable cors
app.use(cors({ origin: true }));

//TODO: enable authentication

//mount routes
app.use("/v1", routes);

// intialize DB
DB.sync()
  .then((result) => console.log("connected"))
  .catch((error) => console.log("error", error));

// app.use(error.converter); // if error is not instanceOf APIError, convert it
// app.use(error.notFound); // catch 40 and forward to error handler
// app.use(error.handler); // error handler and stacktrace only during development

//todo: CONVERT ERRORS AND SEND STACKTRACE DURING DEV
export default app;
