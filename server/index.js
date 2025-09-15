import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import walletRouter from "./routes/wallet.js";
import userRoutes from "./routes/user.js";
import mcpRoutes from "./routes/mcp.js";
import orderRoutes from "./routes/order.js"; // Import the new order routes

const app = express();

app.use(cors());
app.use(express.json());

// Remove the mock user middleware for production
// app.use((req, res, next) => {
//   req.user = { id: "mcp123" }; // mock logged-in mcp ID
//   next();
// });

app.use("/api/auth", authRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/users", userRoutes);
app.use("/api/mcp", mcpRoutes); // Use the mcp routes
app.use("/api/orders", orderRoutes); // Use the new order routes

main()
  .then(() => console.log("CONNECTED TO DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});