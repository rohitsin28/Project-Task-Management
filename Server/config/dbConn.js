import mongoose from "mongoose";

export default async function dbConn() {
  try {
    await mongoose.connect(process.env.DB_URI)
    .then(async() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error('MongoDB connection error:', err));;
  } catch (error) {
    console.log(error);
  }
}