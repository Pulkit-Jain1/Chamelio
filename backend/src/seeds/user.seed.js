import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // {
  //   email: "pulkit.jain@gmail.com",
  //   fullName: "Pulkit Jain",
  //   password: "123456789",
  //   profilePic: "",
  // },
  {
    email: "arjun.verma@example.com",
    fullName: "Arjun Verma",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "ananya.reddy@example.com",
    fullName: "Ananya Reddy",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "karan.malhotra@example.com",
    fullName: "Karan Malhotra",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "rohit.iyer@example.com",
    fullName: "Rohit Iyer",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "siddharth.nair@example.com",
    fullName: "Siddharth Nair",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "anish.das@example.com",
    fullName: "Anish Das",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "mohit.kapoor@example.com",
    fullName: "Mohit Kapoor",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    email: "nishant.banerjee@example.com",
    fullName: "Nishant Banerjee",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "pranav.choudhary@example.com",
    fullName: "Pranav Choudhary",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    email: "abhishek.rathore@example.com",
    fullName: "Abhishek Rathore",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "deepak.gupta@example.com",
    fullName: "Deepak Gupta",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "tarun.mehta@example.com",
    fullName: "Tarun Mehta",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "ankit.bhatt@example.com",
    fullName: "Ankit Bhatt",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    email: "saurav.agarwal@example.com",
    fullName: "Saurav Agarwal",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
