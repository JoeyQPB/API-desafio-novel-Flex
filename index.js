import express from "express";
import * as dotenv from "dotenv";
import { dbConnect } from "./config/db.config.js";
import { userRouter } from "./routes/user.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { uploadImgRouter } from "./routes/upload-image.routes.js";
import { apiLimiter } from "./middlewares/limiter.js";

dotenv.config();
const app = express();
dbConnect();
app.use(express.json());

app.use(`/user`, apiLimiter, userRouter);
app.use(`/product`, apiLimiter, productRouter);
app.use(`/upload_image`, apiLimiter, uploadImgRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`server running at port ${process.env.PORT}`);
});
