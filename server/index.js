const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./router/payment");
const app = express();
const { authRouter } = require("./router/auth");
const connectDb = require("./config/db");

dotenv.config();

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
