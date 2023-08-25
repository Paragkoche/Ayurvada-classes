import express from "express";
import Cors from "cors";
import db from "@/Database";
import AllRoutes from "@/Routes/router";
const app = express();
app.use(
  express.json({
    limit: "50GB",
  })
);
app.use("/video", express.static("./video"));
app.use(Cors());

app.use("/v1", AllRoutes);

app.listen(8080, async () => {
  await db.initialize();
  console.log("server start 🚀🚀");
});
