# 🦎 Chamelio - Emotion-Adaptive Chat Platform

## 🔄 Transforming Communication Like a Chameleon

Chamelio is a next-generation, AI-powered chat application that dynamically transforms its interface based on conversation sentiment - just like a chameleon adapts to its environment. By leveraging cutting-edge sentiment analysis with Google's Generative AI, Chamelio creates an immersive communication experience that reflects the emotional context of your conversations.

## ✨ Key Features

- **🧠 AI-Powered Emotion Detection**: Utilizes Google's Generative AI to analyze conversation sentiment in real-time
- **🎨 Adaptive UI**: Automatically transforms themes based on 30+ detected emotional states
- **⚡ Real-Time Messaging**: Low-latency communication with Socket.io
- **🔒 Secure Authentication**: JWT-based authentication with HTTP-only cookies and CSRF protection
- **☁️ Cloud Storage**: Cloudinary integration for seamless image sharing
- **🔄 State Management**: Efficient state handling with Zustand
- **📱 Responsive Design**: Fully responsive interface built with TailwindCSS and DaisyUI

## 🛠️ Technical Architecture

### Frontend
- **Framework**: React 18 with Vite for optimized build performance
- **Styling**: TailwindCSS with DaisyUI theming system (30+ themes)
- **State Management**: Zustand for lightweight yet powerful state handling
- **Real-time Communication**: Socket.io client for instant messaging
- **HTTP Client**: Axios with interceptors for API requests
- **Routing**: React Router v6 with protected routes

### Backend
- **Server**: Express.js with MVC architecture
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT implementation with secure HTTP-only cookies
- **Real-time**: Socket.io server implementation with user tracking
- **AI Integration**: Google's Generative AI (Gemini 2.0 Flash model)
- **Cloud Storage**: Cloudinary for image management
- **Security**: CORS configuration, input validation, and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (local or Atlas)
- Cloudinary account
- Google AI API key

### Environment Setup
Create a `.env` file in the project root with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pulkit-Jain1/chamelio.git
cd chamelio
```

2. Install dependencies
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

3. Build the app
```bash
npm run build
```

4. Start the app
```bash
npm start
```

The application will be available at `http://localhost:5001`

## 🧪 AI Sentiment Classification

Chamelio can detect and respond to 30+ emotional states including:
- Happy, Sad, Angry, Neutral
- Urgent, Casual, Professional
- Confused, Supportive, Informative
- Humorous, Anxious, Grateful
- Apologetic, Surprised, Romantic
- And many more!

Each emotional state triggers a unique theme transformation, creating a visually responsive interface that enhances communication through emotional context.

## 🔄 Workflow

1. User messages are securely transmitted in real-time via Socket.io
2. Google's Generative AI analyzes conversation sentiment
3. The UI theme adapts instantly to match the detected emotional context
4. All messages are persisted to MongoDB for future reference
5. Images are optimized and stored in Cloudinary's cloud infrastructure

## 📱 Responsive Design

The application features a meticulously crafted responsive interface that adapts to any device size:
- Full-featured experience on desktop
- Optimized layout for tablets
- Mobile-friendly interface for on-the-go communication

## 👥 Contributors

- Pulkit Jain - Lead Developer

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Chamelio: Where conversation and design evolve together.*
