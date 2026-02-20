import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./features/user/user.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js";


dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

//DB connection
connectDB();

//routes
app.use("/api/user", userRoutes)
//app listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
