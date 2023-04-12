import db from "./DB";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import gql from "./Gql/index.gql";
import * as Cookie from "cookie-parser";
import { createHandler } from "graphql-http/lib/use/express";
import DB from "./DB";
const app = express();
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

app.listen(8080, async () => {
  await DB.initialize();
  console.log("server started on http://localhost:8080");
});
