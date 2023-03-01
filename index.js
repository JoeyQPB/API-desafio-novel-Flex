import express from "express";
import * as dotenv from "dotenv";
import { dbConnect } from "./config/db.config.js";

dotenv.config();
const app = express();
dbConnect();

app.listen(Number(process.env.PORT), () => {
  console.log(`server running at port ${process.env.PORT}`);
});
