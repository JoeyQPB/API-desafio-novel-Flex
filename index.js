import express from "express";
import * as dotenv from "dotenv";
import { dbConnect } from "./config/db.config.js";
import { userRouter } from "./routes/user.routes.js";
import { productRouter } from "./routes/product.routes.js";

dotenv.config();
const app = express();
dbConnect();
app.use(express.json());

app.use(`/user`, userRouter);
app.use(`/product`, productRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`server running at port ${process.env.PORT}`);
});
