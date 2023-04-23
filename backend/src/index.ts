import db from "./DB";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import gql from "./Gql/index.gql";
import * as Cookie from "cookie-parser";
import { createHandler } from "graphql-http/lib/use/express";
import DB from "./DB";
import * as https from "https";
import * as cors from "cors";
import * as fs from "fs";
const app = express();
app.use(
  cors({
    origin:
 function (origin, callback) {
    if ([
      "tanwishlife.com",
      // "https://ayurveda.tanwishlife.com:80/",
      // "http://localhost:3000",

    ].indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null,true)
    }
  },
    credentials: true,
    //allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(Cookie());
app.all("/gql", (request: Request, response: Response, nex: NextFunction) =>
  createHandler({
    ...gql,
    context: {
      req: request,
      res: response,
    },
  })(request, response, nex)
);
const server = https.createServer(
  {
    key: fs.readFileSync("./src/privatekey.pem"),
    cert: fs.readFileSync("./src/certificate.pem"),
  },
  app
);
server.listen(2053, async () => {
  await DB.initialize();
  console.log(server);

  console.log("server started on https://localhost:2053");
});
// app.listen(2053, async () => {

//   console.log("server started on http://localhost:2053");
// });
