import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";


import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Brain, Smile, Palette, Sparkles } from "lucide-react";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      {/* <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      /> */}





{/* Right Side - Animated AI & Emotions Theme */}
<div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
  <div className="max-w-md text-center">
    {/* Animated Icons Grid */}
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* AI Chat Icon */}
      <div className="group flex flex-col items-center">
        <div className="size-24 rounded-2xl bg-primary/10 flex items-center justify-center 
                       transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 mb-3">
          <MessageSquare className="size-12 text-primary transition-all duration-300 group-hover:rotate-12" />
        </div>
        <span className="text-sm font-medium">Low-Latency Chats</span>
      </div>
      
      {/* Emotion/Sentiment Icon */}
      <div className="group flex flex-col items-center">
        <div className="size-24 rounded-2xl bg-secondary/10 flex items-center justify-center 
                       transform transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/20 mb-3">
          <Smile className="size-12 text-secondary transition-all duration-300 group-hover:rotate-12" />
        </div>
        <span className="text-sm font-medium">Emotion Analysis</span>
      </div>
      
      {/* Theme/Chameleon Icon */}
      <div className="group flex flex-col items-center">
        <div className="size-24 rounded-2xl bg-accent/10 flex items-center justify-center 
                       transform transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20 mb-3">
          <Palette className="size-12 text-accent transition-all duration-300 group-hover:rotate-12" />
        </div>
        <span className="text-sm font-medium">30+ Adaptive Themes</span>
      </div>
      
      {/* AI Brain Icon */}
      <div className="group flex flex-col items-center">
        <div className="size-24 rounded-2xl bg-info/10 flex items-center justify-center 
                       transform transition-all duration-300 group-hover:scale-110 group-hover:bg-info/20 mb-3">
          <Brain className="size-12 text-info transition-all duration-300 group-hover:rotate-12" />
        </div>
        <span className="text-sm font-medium">AI Powered</span>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold mb-4 mt-6">Welcome back!</h2>
    
    <div className="prose prose-sm max-w-md mx-auto">
      {/* <p className="text-base-content/70">
        Sign in to experience our emotion-adaptive chat platform that transforms based on conversation tone, just like a chameleon!
      </p> */}

      <p className="text-base-content/70">
  Sign in to experience our emotion-adaptive chat platform that transforms based on conversation tone, just like a{" "}
  <span className="font-bold text-primary transition-all duration-300 hover:scale-105 inline-block">
    chameleon
  </span>
  !
</p>

      
      <ul className="text-left text-base-content/70 mt-4 space-y-1 list-disc pl-5">
        <li>AI-powered sentiment analysis interprets chat emotions</li>
        <li>Interface themes adapt to match conversation mood</li>
        {/* <li>Enhanced communication through emotional context</li> */}
        <li>Personalized experience that evolves with you</li>
        <li>Seamless, low-latency chats with integrated image sharing</li>
        <li>Cloud-based conversation storage accessible anytime</li>
      </ul>
    </div>
  </div>
</div>










    </div>
  );
};
export default LoginPage;
