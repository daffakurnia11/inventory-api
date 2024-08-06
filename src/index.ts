import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/AdminRoute";
import { responseHandler } from "./middlewares/responseHandler";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(bodyParser.json());
app.use(responseHandler);
app.use("/api", adminRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
