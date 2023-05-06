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
import { encode as PasswordE } from "./Util/Password";
const app = express();
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

    cb(null, req.params.id + ".mp4");
  },
});
//just chacke user is pressent or not
app.get("/video/:id", async (req, res) => {
  let video: any = await DB.video.findUnique({
    where: { id: req.params.id.split(".")[0] },
  });
  const videoPath = "./" + video.link;
  const range = req.headers.range || "bytes=0-";
  if (!range) {
    return res.status(400).send("Requires Range header");
  }
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(
    range?.replace(/\D/g, "") || "bytes=0-".replace(/\D/g, "")
  );
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1) || 0;
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});
app.post(
  "/upload/video/:id",
  multer({ storage, limits: { fileSize: 1000000 * 1024 * 1024 } }).single(
    "file"
  ),
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
    const video = await DB.video.findUnique({ where: { id: req.params.id } });
    // console.log(video, "ok");

    if (!video) return res.send("video not found");

    // console.log(req.params);

    const videoUpdate = await DB.video.update({
      where: { id: video.id },
      data: {
        link: "/video/" + filename,
      },
    });
    return res.send(videoUpdate);
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

  console.log("server started on https://localhost:2053");
});
