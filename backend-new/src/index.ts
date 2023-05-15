import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";
import { createHandler } from "graphql-http/lib/use/express";
import DB from "./DB";
import multer from "multer";
import schema from "./GQL";
import { decode } from "jsonwebtoken";
import { Stripe } from "stripe";
import { pay_key } from "./Util/env";
import { getData, setCache } from "./Util/cache";
import { randomUUID } from "crypto";
import { encode as PasswordE } from "./Util/Password";
const app = express();
app.use("/video", express.static("./video"));
app.use(
  express.json({
    limit: "1tb",
  })
);
const pay = new Stripe(pay_key, {
  apiVersion: "2022-11-15",
});
app.use(
  cors({
    origin(requestOrigin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/gql", (req, res, next) =>
  createHandler({
    schema,
    context: {
      req,
      res,
    },
  })(req, res, next)
);
const storage = multer.diskStorage({
  destination: "./video/",
  filename: (req, file, cb) => {
    // console.log(req.params);

    // console.log(req.params.id);

    cb(null, `${randomUUID()}.${file.originalname.split(".").at(-1)}`);
  },
});
app.post(
  "/upload/video/",
  multer({ storage, limits: { fieldSize: 1024 ** 1024 } }).single("file"),
  async (req, res) => {
    const { filename }: any = req.file;
    // console.log(req.params.id);

    const id: any = decode(req.cookies.token);
    if (!id) return res.send({ error: "your not found" });
    const user = await DB.user.findUnique({
      where: {
        id: id.id,
      },
    });
    // console.log(user);

    if (!user) return res.send({ error: { message: "login first" } });
    if (user.role == "client")
      return res.send({ error: { message: "your not admin" } });
    const now = new Date();
    const next48 = new Date(now.setDate(now.getDate() + 2));
    try {
      const makeVideo = await DB.video.create({
        data: {
          title: req.body.title,
          photo: req.body.photo,
          disc: req.body.disc,
          isZoomMeet: false,
          isLiveNow: false,
          is48h: next48,
          link: "/video/" + filename,
          Classes: {
            connect: {
              id: req.body.class,
            },
          },
        },
      });
      return res.json(makeVideo);
    } catch (e) {
      console.log(e);

      res.status(400).send(e);
    }
  }
);
app.post("/pay/strip/:id", async (req, res) => {
  if (!req.params.id) return;
  const _user: any = decode(req.cookies.token);
  if (!_user) return res.json({ error: "login first" });
  const user = await DB.user.findUnique({
    where: {
      id: _user.id,
    },
  });
  if (!user) return res.json({ error: "login first" });
  if (user.role !== "client") return res.json({ error: "your not client" });
  const _classes = await DB.classes.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!_classes) return res.json({ error: "classes not found" });
  const payment = await pay.paymentIntents.create({
    amount: Math.round(parseInt(_classes.pay) + parseInt(_classes.pay) * 0.02),
    currency: "inr",
  });
  res.send({
    amount: Math.round(parseInt(_classes.pay) + parseInt(_classes.pay) * 0.02),
    clientSecret: payment.client_secret,
  });
});
app.put("/log-out", (req, res) => {
  res.clearCookie("token").send("OK");
});
app.put("/forgot", async (req, res) => {
  // console.log(req.body);

  const { email } = req.body;
  const user = await DB.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return res.status(501).json({ message: "user not found" });
  const d = setCache(user.email);
  if (d) return res.json({ message: "OTP send" });
  return res.status(404).json({ error: "server error" });
});
app.put("/otp", async (req, res) => {
  const { email, otp } = req.body;
  const varify = getData(email, otp);
  if (typeof varify == "string") res.status(500).send(varify);
  res.send("true");
});
app.put("/password", async (req, res) => {
  const { email, password } = req.body;
  const user = await DB.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return res.status(501).json({ message: "user not found" });
  await DB.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await PasswordE(password),
    },
  });
  res.send("ok");
});
app.listen(8085, async () => {
  await DB.$connect();
  console.log("server start on  http://loaclhost:8085");
});
const server = https.createServer(
  {
    key: fs.readFileSync("./src/privatekey.pem"),
    cert: fs.readFileSync("./src/certificate.pem"),
  },
  app
);
server.listen(2053, async () => {
  await DB.$connect();
  // console.log(server);
  console.log(__dirname);

  console.log("server started on https://localhost:2053");
});
