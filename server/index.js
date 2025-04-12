import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import walletRouter from "./routes/wallet.js";
import userRoutes from "./routes/user.js";
import mcpRoutes from "./routes/mcp.js"


const app = express();

app.use((req, res, next) => {
  req.user = { id: "mcp123" }; // mock logged-in mcp ID
  next();
});

app.use("/mcp", mcpRoutes);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/users", userRoutes);
app.use("/api", userRoutes);


main()
  .then(() => console.log("CONNECTED TO DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
