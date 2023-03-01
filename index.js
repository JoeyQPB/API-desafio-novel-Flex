import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(Number(process.env.PORT), () => {
  console.log(`server running at port ${process.env.PORT}`);
});
