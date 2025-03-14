import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


import { GoogleGenerativeAI } from "@google/generative-ai";




export const analyzeChatSentiment = async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Please provide messages for analysis" });
    }
    
    // Initialize the Gemini API with the key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Extract text from messages and filter out any empty messages
    const messageTexts = messages.map(msg => msg.text).filter(text => text).join("\n---\n");
    
    // Create the prompt for Gemini
    const prompt = `
      Analyze the following chat messages and categorize them into exactly ONE of these categories:
      -Happy: Expressing joy, excitement, or positivity.
      -Sad: Conveying disappointment, sorrow, or negative emotions.
      -Angry: Showing frustration, irritation, or anger.
      -Neutral: No strong emotional content or expression.
      -Urgent: Time-sensitive, important, or immediate attention needed.
      -Casual: Informal, relaxed conversation or chat.
      -Professional: Formal or business-related communication.
      -Confused: Uncertain, unclear, or expressing confusion.
      -Supportive: Providing empathy, encouragement, or emotional support.
      -Informative: Primarily sharing facts or useful information.
      -Humorous: Intended to amuse, entertain, or joke.
      -Anxious: Expressing worry, stress, nervousness, or fear.
      -Grateful: Showing appreciation, gratitude, or thanks.
      -Apologetic: Expressing regret, apology, or remorse.
      -Surprised: Expressing unexpected realization or amazement.
      -Romantic: Expressing affection, love, or romantic sentiments.
      -Excited: Showing enthusiasm, eagerness, or anticipation.
      -Tired: Expressing fatigue, exhaustion, or low energy.
      -Sarcastic: Using irony, sarcasm, or playful mockery.
      -Disappointed: Feeling let-down, discouraged, or unmet expectations.
      -Curious: Expressing interest, questions, or seeking details.
      -Fearful: Expressing fear, apprehension, or dread.
      -Optimistic: Expressing confidence, hopefulness, or positivity for the future.
      -Pessimistic: Negative outlooks, cynicism, or bleak expectations.
      -Impatient: Expressing annoyance about delays or a need for quick response.
      -Proud: Expressing pride, accomplishment, or satisfaction with achievements.
      -Embarrassed: Showing shame, awkwardness, or discomfort.
      -Sympathetic: Expressing compassion towards someone's situation.
      -Bored: Indicating disinterest, monotony, or lack of engagement.
      -Motivational: Intending to inspire, energize, or positively influence others.
      -Assertive: Direct, firm statements, clearly expressing opinions or needs.
      -Concerned: Expressing worry, care, or concern for someone's well-being.
      
      Chat messages:
      ${messageTexts}
      
      Respond with ONLY the category name that best represents the overall sentiment of ALL messages collectively.
    `;
    
    // Generate content from Gemini
    const result = await model.generateContent(prompt);
    const category = result.response.text().trim();
    
    return res.status(200).json({ category });
    
  } catch (error) {
    console.error("Error in chat sentiment analysis:", error);
    res.status(500).json({ message: "Internal server error during sentiment analysis" });
  }
};




export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
