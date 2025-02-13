import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { authenticateToken } from "./middlewares/auth";
import { responseHandler } from "./middlewares/responseHandler";

import authRoute from "./routes/AuthRoute";
import adminRoute from "./routes/AdminRoute";
import categoryRoute from "./routes/CategoryRoute";
import productRoute from "./routes/ProductRoute";
import transactionRoute from "./routes/TransactionRoute";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(responseHandler);
app.use("/api", authRoute);
app.use("/api/admin", authenticateToken, adminRoute);
app.use("/api/category", authenticateToken, categoryRoute);
app.use("/api/product", authenticateToken, productRoute);
app.use("/api/transaction", authenticateToken, transactionRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
