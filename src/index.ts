import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/AuthRoute";
import adminRoute from "./routes/AdminRoute";
import { errorHandler } from "./middlewares/errorHandler";
import { authenticateToken } from "./middlewares/auth";
import { responseHandler } from "./middlewares/responseHandler";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(bodyParser.json());
app.use(responseHandler);
app.use("/api", authRoute);
app.use("/api/admin", authenticateToken, adminRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
