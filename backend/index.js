import express from "express";
import connectDB from "./src/configs/connectDB.js";
import hotelRouter from "./src/routes/hotelRoute.js";
import userRouter from "./src/routes/userRoute.js";
import dashboardRouter from "./src/routes/dashboardRoute.js"
import bodyParser from "body-parser";
import cors from "cors";
//--
const app = express();
process.loadEnvFile();

//--    middleware
app.use(cors());
app.use(bodyParser.json());

app.use(hotelRouter);
app.use(userRouter);
app.use(dashboardRouter);

//--    database connection function call
connectDB();

//--    start local server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
