import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Sparkles} from "lucide-react";
import toast from "react-hot-toast";

import { useThemeStore } from "../store/useThemeStore";


import { axiosInstance } from "../lib/axios";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, messages } = useChatStore();
  const [lastTenTextMessages, setLastTenTextMessages] = useState([]);

  // Add this inside your component to access the setTheme function
  const { setTheme } = useThemeStore();
  
  // Add this emotion-to-theme mapping inside your component
  const emotionThemeMap = {
    "Happy": "cupcake",
    "Sad": "dim",
    "Angry": "halloween",
    "Neutral": "corporate",
    "Urgent": "cyberpunk",
    "Casual": "lofi",
    "Professional": "business",
    "Confused": "wireframe",
    "Supportive": "pastel",
    "Informative": "nord",
    "Humorous": "bumblebee",
    "Anxious": "sunset",
    "Grateful": "garden",
    "Apologetic": "aqua",
    "Surprised": "synthwave",
    "Romantic": "valentine",
    "Excited": "lemonade",
    "Tired": "coffee",
    "Sarcastic": "retro",
    "Disappointed": "autumn",
    "Curious": "fantasy",
    "Fearful": "dracula",
    "Optimistic": "emerald",
    "Pessimistic": "dark",
    "Impatient": "acid",
    "Proud": "luxury",
    "Embarrassed": "cmyk",
    "Sympathetic": "forest",
    "Bored": "black",
    "Motivational": "light",
    "Assertive": "night",
    "Concerned": "winter"
  };










// Add this state variable at the top with your other useState declarations
// const [lastTenTextMessages, setLastTenTextMessages] = useState([]);
// const { messages } = useChatStore();

// // This function retrieves the last 10 text-only messages
// const fetchLastTenTextMessages = () => {
//   // Filter out messages that contain images, keeping only text messages
//   const textOnlyMessages = messages.filter(message => !message.image && message.text);
  
//   // Get the last 10 text messages (or fewer if there aren't 10)
//   const lastTenMessages = textOnlyMessages.slice(-10);
  
//   // Update state with these messages
//   setLastTenTextMessages(lastTenMessages);
  
//   console.log("Last 10 text messages:", lastTenMessages);
// };





// Then update your fetchLastTenTextMessages function:
const fetchLastTenTextMessages = async () => {
  // Filter out messages that contain images, keeping only text messages
  const textOnlyMessages = messages.filter(message => !message.image && message.text);
  
  // Get the last 10 text messages (or fewer if there aren't 10)
  const lastTenMessages = textOnlyMessages.slice(-10);
  
  // Update state with these messages
  setLastTenTextMessages(lastTenMessages);
  
  try {
    const response = await axiosInstance.post("/messages/analyze-sentiment", {
      messages: lastTenMessages
    });
    
    const sentiment = response.data.category;
    
    // Apply the corresponding theme if sentiment is in our mapping
    if (emotionThemeMap[sentiment]) {
      setTheme(emotionThemeMap[sentiment]);
      toast.success(`Chat sentiment: ${sentiment} \n Theme changed to: ${emotionThemeMap[sentiment]}`,
        {
          duration: 3000 // 8 seconds duration instead of the default
        }
      );
    } else {
      toast.success(`Chat sentiment: ${sentiment}`);
    }
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to analyze sentiment";
    toast.error(errorMessage);
    console.error("Sentiment analysis error:", error);
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* <button
            type="button"
            // className={`sm:flex btn btn-circle
            //          ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            className={`sm:flex btn btn-circle hover:text-primary
              ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
     
                     onClick={fetchLastTenTextMessages}
          >
            <Sparkles size={20} />
          </button>

          <button
            type="button"
            className={`sm:flex btn btn-circle hover:text-primary
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div> */}


          <button
  type="button"
  className={`btn btn-circle btn-sm sm:btn-md hover:text-primary
    ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
  onClick={fetchLastTenTextMessages}
>
  <Sparkles className="h-4 w-4 sm:size-5" />
</button>

<button
  type="button"
  className={`btn btn-circle btn-sm sm:btn-md hover:text-primary
    ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
  onClick={() => fileInputRef.current?.click()}
>
  <Image className="h-4 w-4 sm:size-5" />
</button>
</div>


        {/* <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button> */}

{/* 
        <button
  type="submit"
  className="btn btn-circle min-h-0 h-11.2 w-11.2 flex items-center justify-center p-0"
  disabled={!text.trim() && !imagePreview}
>
  <Send size={23} className="text-current" />
</button> */}



<button
  type="submit"
  className="btn btn-circle btn-sm sm:btn-md flex items-center justify-center"
  disabled={!text.trim() && !imagePreview}
>
  <Send className="h-4 w-4 sm:size-5 text-current" />
</button>



      </form>
    </div>
  );
};
export default MessageInput;
