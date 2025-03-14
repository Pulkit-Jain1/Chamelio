// backend/src/seeds/cleanup.js
import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

config();

const cleanupDatabase = async () => {
  try {
    await connectDB();
    
    // Delete all messages first
    const messagesResult = await Message.deleteMany({});
    console.log(`Deleted ${messagesResult.deletedCount} messages successfully`);
    
    // Delete all users
    const usersResult = await User.deleteMany({});
    console.log(`Deleted ${usersResult.deletedCount} users successfully`);
    
    console.log("Database cleanup completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error cleaning up database:", error);
    process.exit(1);
  }
};

cleanupDatabase();
