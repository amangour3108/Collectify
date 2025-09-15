import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB for seeding.");

    // Drop the entire database (empties all collections)
    await mongoose.connection.dropDatabase();
    console.log("Dropped the entire database.");

    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Database emptying failed:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();