import express from "express";
import Cors from "cors";
import db from "@/Database"
const app = express();
app.use(Cors());






app.listen(8080, async () => {
    await db.initialize()
    console.log("server start 🚀🚀");

})