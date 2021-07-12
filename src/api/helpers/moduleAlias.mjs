import alias from "module-alias";
import { __dirname } from "../../../globalExports.mjs";

alias.addAlias({
  "@root": __dirname,
  "@controllers": __dirname + "/src/api/controllers",
  "@helpers": __dirname + "/src/api/helpers",
  "@models": __dirname + "/src/api/models",
  "@routesV1": __dirname + "/src/api/routes/v1",
  "@config": __dirname + "/src/config",
  "@middleware": __dirname + "/src/api/middleware",
});
