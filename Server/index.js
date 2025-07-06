import dotenv from "dotenv";
import express from "express";
import dbConnect from "./config/dbConn.js";
import configureExpress from "./config/express-config.js";
import router from "./routes/index.js";
dotenv.config()

const app = express();
configureExpress(app, express);
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).json({message: "Welcome to the Lone Worker!"});
});

app.use("/api/v1/", router);

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}!`);
});