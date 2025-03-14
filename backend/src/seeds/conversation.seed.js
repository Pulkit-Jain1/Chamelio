import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import bcrypt from "bcryptjs";

config();

// Define the conversations
const conversations = [
  {
    title: "Excitement",
    participants: ["Ananya Reddy", "Pulkit Jain"],
    messages: [
      { sender: "Ananya Reddy", text: "Pulkit! Guess what?!" },
      { sender: "Pulkit Jain", text: "Haha, what's up? Spill the beans!" },
      { sender: "Ananya Reddy", text: "I got selected for the cultural exchange program in Spain! I can't believe it!" },
      { sender: "Pulkit Jain", text: "WHAT?! That's insane! I'm so happy for you! You totally deserved this!" },
      { sender: "Ananya Reddy", text: "Thanks, Pulkit! I'm so nervous though. New country, new people…" },
      { sender: "Pulkit Jain", text: "You'll slay it, Ananya. You're a natural at making friends. When are you leaving?" },
      { sender: "Ananya Reddy", text: "Next month! I need to sort out my documents now. But I'll tell you all the details when we meet!" },
    ]
  },
  {
    title: "Anger",
    participants: ["Rohit Iyer", "Pulkit Jain"],
    messages: [
      { sender: "Rohit Iyer", text: "Pulkit, have you seen the latest group project submissions?" },
      { sender: "Pulkit Jain", text: "No, not yet. Why?" },
      { sender: "Rohit Iyer", text: "Karan literally copy-pasted half his work from random blogs online! This is such a mess!" },
      { sender: "Pulkit Jain", text: "Wait, what? Are you serious? We're getting graded on this, man!" },
      { sender: "Rohit Iyer", text: "Exactly! I spent hours doing proper research, and this guy doesn't even care!" },
      { sender: "Pulkit Jain", text: "Let's talk to him tomorrow. We can't let this mess up the whole project." },
      { sender: "Rohit Iyer", text: "Yeah, we need to fix this. I wish people would take things seriously." },
    ]
  },
  {
    title: "Joy",
    participants: ["Nishant Banerjee", "Pulkit Jain"],
    messages: [
      { sender: "Nishant Banerjee", text: "Pulkit, dude, I finally nailed my performance review!" },
      { sender: "Pulkit Jain", text: "Brooo, congratulations! That's awesome news!" },
      { sender: "Nishant Banerjee", text: "Thanks, man. I was totally stressing over this. My manager was like, \"You exceeded expectations.\" 😎" },
      { sender: "Pulkit Jain", text: "That's killer, Nishant! Drinks on you tonight?" },
      { sender: "Nishant Banerjee", text: "Haha, let's do it this weekend! I owe you for listening to all my rants." },
    ]
  },
  {
    title: "Sadness",
    participants: ["Siddharth Nair", "Pulkit Jain"],
    messages: [
      { sender: "Siddharth Nair", text: "Hey Pulkit, I feel so lost right now." },
      { sender: "Pulkit Jain", text: "Sid, what happened? Everything okay?" },
      { sender: "Siddharth Nair", text: "I just got rejected from my dream internship… I worked so hard for this." },
      { sender: "Pulkit Jain", text: "I'm so sorry, man. I know how much this meant to you." },
      { sender: "Siddharth Nair", text: "I don't know where I went wrong. They didn't even give me proper feedback." },
      { sender: "Pulkit Jain", text: "Don't beat yourself up over this, Sid. You're talented, and something better will come along." },
    ]
  },
  {
    title: "Gratitude",
    participants: ["Arjun Verma", "Pulkit Jain"],
    messages: [
      { sender: "Arjun Verma", text: "Pulkit, I just wanted to say thank you." },
      { sender: "Pulkit Jain", text: "For what? What did I even do? 😅" },
      { sender: "Arjun Verma", text: "You listened to me vent about so much last week. It really helped me clear my head." },
      { sender: "Pulkit Jain", text: "Come on, Arjun. You don't have to thank me for that. I'm always here for you." },
      { sender: "Arjun Verma", text: "It means a lot, man. I was thinking about it and just wanted you to know." },
    ]
  },
  {
    title: "Concern",
    participants: ["Mohit Kapoor", "Pulkit Jain"],
    messages: [
      { sender: "Mohit Kapoor", text: "Pulkit, I heard about your back pain. Are you okay?" },
      { sender: "Pulkit Jain", text: "Yeah, Mohit. It's been bothering me for a few days now." },
      { sender: "Mohit Kapoor", text: "Have you seen a doctor? You shouldn't ignore this." },
      { sender: "Pulkit Jain", text: "Not yet. I thought it would go away, but I guess I should get it checked." },
      { sender: "Mohit Kapoor", text: "Please do, Pulkit. Back issues can become serious if you delay treatment." },
    ]
  },
  {
    title: "Curiosity",
    participants: ["Anish Das", "Pulkit Jain"],
    messages: [
      { sender: "Anish Das", text: "Pulkit, random question—what do you think about AI taking over jobs?" },
      { sender: "Pulkit Jain", text: "Uh, interesting topic, Anish. I think it's a mix of pros and cons. Why do you ask?" },
      { sender: "Anish Das", text: "I was reading this article about how many creative jobs could be replaced soon. It's kind of scary." },
      { sender: "Pulkit Jain", text: "True, but creative jobs require human emotion, which AI can't fully replicate." },
      { sender: "Anish Das", text: "That's a good point. Guess there's hope for my photography career after all!" },
    ]
  },
  {
    title: "Frustration",
    participants: ["Karan Malhotra", "Pulkit Jain"],
    messages: [
      { sender: "Karan Malhotra", text: "Pulkit, I don't understand this coding assignment at all." },
      { sender: "Pulkit Jain", text: "Chill, Karan. What part are you stuck on?" },
      { sender: "Karan Malhotra", text: "Literally everything. I've reread it five times, and it's still Greek to me." },
      { sender: "Pulkit Jain", text: "Haha, okay. Let's break it down. Show me what you've got so far." },
      { sender: "Karan Malhotra", text: "Thanks, man. This thing is driving me insane." },
    ]
  },
  {
    title: "Admiration",
    participants: ["Ananya Reddy", "Pulkit Jain"],
    messages: [
      { sender: "Ananya Reddy", text: "Pulkit, I've been meaning to say—you have a way with words." },
      { sender: "Pulkit Jain", text: "What? Where did that come from? 😅" },
      { sender: "Ananya Reddy", text: "Just reading your essays and hearing you talk… You make complex ideas sound so simple." },
      { sender: "Pulkit Jain", text: "Thanks, Ananya! That's sweet of you to say. I guess it comes from loving debates!" },
      { sender: "Ananya Reddy", text: "Well, keep it up. You could totally be a motivational speaker someday." },
    ]
  },
  {
    title: "Surprise",
    participants: ["Siddharth Nair", "Pulkit Jain"],
    messages: [
      { sender: "Siddharth Nair", text: "Pulkit, you'll never guess who I ran into at the mall!" },
      { sender: "Pulkit Jain", text: "Okay, hit me—who was it?" },
      { sender: "Siddharth Nair", text: "Mrs. Sharma, our 10th-grade math teacher! She actually remembered me!" },
      { sender: "Pulkit Jain", text: "No way! The same Mrs. Sharma who gave you detention for doodling in class? 😂" },
      { sender: "Siddharth Nair", text: "Yup, the same! She even asked about you. Said you were one of her brightest students." },
      { sender: "Pulkit Jain", text: "That's crazy! I need to visit the mall more often. 😂" },
    ]
  }
];

// Define missing users if needed
const missingUserProfiles = {
  "Rohit Iyer": {
    email: "rohit.iyer@example.com",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  "Nishant Banerjee": {
    email: "nishant.banerjee@example.com",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  "Arjun Verma": {
    email: "arjun.verma@example.com",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  "Mohit Kapoor": {
    email: "mohit.kapoor@example.com",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  "Anish Das": {
    email: "anish.das@example.com", 
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  "Karan Malhotra": {
    email: "karan.malhotra@example.com",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
  }
};

// Seed conversations into the database
const seedConversations = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Connected to MongoDB");

    // Create user mapping (fullName -> userId)
    const userMap = new Map();
    
    // Find all required participants
    const uniqueParticipants = new Set();
    conversations.forEach(convo => {
      convo.participants.forEach(name => uniqueParticipants.add(name));
    });
    
    console.log(`Found ${uniqueParticipants.size} unique participants in conversations`);

    // Find or create each user
    for (const name of uniqueParticipants) {
      let user = await User.findOne({ fullName: name });
      
      if (user) {
        console.log(`Found existing user: ${name}`);
        userMap.set(name, user._id);
        continue;
      }
      
      // If user doesn't exist, check if we have profile data
      if (missingUserProfiles[name]) {
        console.log(`Creating new user: ${name}`);
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(missingUserProfiles[name].password, salt);
        
        user = new User({
          fullName: name,
          email: missingUserProfiles[name].email,
          password: hashedPassword,
          profilePic: missingUserProfiles[name].profilePic,
        });
        
        await user.save();
        console.log(`Created user: ${name}`);
        userMap.set(name, user._id);
      } else {
        console.error(`User ${name} not found and no profile data available`);
        process.exit(1);
      }
    }

    console.log(`Successfully processed ${userMap.size} users`);

    // Generate timestamps for conversations
    // Each conversation will be 1-6 hours apart, starting from 3 days ago
    const now = new Date();
    let currentDate = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000)); // 3 days ago
    
    for (const conversation of conversations) {
      console.log(`\nInserting conversation: ${conversation.title}`);
      
      // Add 1-6 hours to the current date for this conversation
      const hoursToAdd = Math.floor(Math.random() * 6) + 1;
      currentDate = new Date(currentDate.getTime() + (hoursToAdd * 60 * 60 * 1000));
      
      let messageTime = new Date(currentDate);
      
      // Insert messages with 2-5 minute gaps
      for (const messageData of conversation.messages) {
        // Add 2-5 minutes between messages
        const minutesToAdd = Math.floor(Math.random() * 4) + 2;
        messageTime = new Date(messageTime.getTime() + (minutesToAdd * 60 * 1000));
        
        const senderId = userMap.get(messageData.sender);
        const receiverId = userMap.get(
          conversation.participants.find(p => p !== messageData.sender)
        );
        
        if (!senderId || !receiverId) {
          console.error(`Cannot find user IDs for message: ${messageData.text}`);
          continue;
        }
        
        const message = new Message({
          senderId,
          receiverId,
          text: messageData.text,
          createdAt: messageTime,
          updatedAt: messageTime
        });
        
        await message.save();
        console.log(`- Inserted message: ${messageData.text.substring(0, 40)}${messageData.text.length > 40 ? '...' : ''}`);
      }
    }
    
    console.log("\nAll conversations have been successfully inserted!");
    console.log("You can now log in as any of these users with password: 123456");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding conversations:", error);
    process.exit(1);
  }
};

// Run the seed function
seedConversations();
