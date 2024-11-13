import mongoose from "mongoose";
process.loadEnvFile();

//--
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected.");
  } catch (error) {
    console.log("database connection failed.");
  }
}
export default connectDB;
