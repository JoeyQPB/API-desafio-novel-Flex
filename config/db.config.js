import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connect to DB: ${dbConnect.connection.name}`);
  } catch (err) {
    console.log(err);
  }
}
