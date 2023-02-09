import mongoose from "mongoose";
import config from ".";

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(config.MONGO_URI);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connected to MongoDB"));
};

export default connectDB;
