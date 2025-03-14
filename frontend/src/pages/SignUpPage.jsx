import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";




import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Brain, Palette, MessageCircle, HeartHandshake, Sparkles } from "lucide-react";



import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
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
                  <Lock className="size-5 text-base-content/40" />
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
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      {/* <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> */}





{/* Right Side - Chameleon Theme Animation */}
<div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
  <div className="max-w-md text-center">
    {/* Central Chameleon Illustration */}
    <div className="relative w-48 h-48 mx-auto mb-8 group">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 
                     blur-lg transition-all duration-500 group-hover:blur-xl group-hover:opacity-90"></div>
      <div className="absolute inset-4 bg-base-200 rounded-full"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative size-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="size-16 text-primary transition-transform duration-500 group-hover:rotate-45" />
          </div>
          {/* <div className="absolute -top-8 -right-8">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center 
                           transition-all duration-300 hover:scale-110 hover:bg-primary/20">
              <MessageCircle className="size-6 text-primary" />
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8">
            <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center 
                           transition-all duration-300 hover:scale-110 hover:bg-secondary/20">
              <Brain className="size-6 text-secondary" />
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8">
            <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center 
                           transition-all duration-300 hover:scale-110 hover:bg-accent/20">
              <Palette className="size-6 text-accent" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold mb-4">Join our community</h2>
    
    <div className="prose prose-sm max-w-md mx-auto">
    <p className="text-base-content/70">
  Sign in to experience our emotion-adaptive chat platform that transforms based on conversation tone, just like a{" "}
  <span className="font-bold text-primary transition-all duration-300 hover:scale-105 inline-block">
    chameleon
  </span>
  !
</p>
      
      <div className="text-left mt-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="size-8 min-w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
            <Brain className="size-4 text-primary" />
          </div>
          <p className="text-base-content/70 text-sm m-0">
            <span className="font-medium">Emotional Intelligence:</span> Our AI detects sentiment from your messages and responds appropriately.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="size-8 min-w-8 rounded-lg bg-secondary/10 flex items-center justify-center mt-0.5">
            <Palette className="size-4 text-secondary" />
          </div>
          <p className="text-base-content/70 text-sm m-0">
            <span className="font-medium">Mood-Adaptive Interface:</span> Watch the chat theme evolve based on conversation tone.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="size-8 min-w-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
            <HeartHandshake className="size-4 text-accent" />
          </div>
          <p className="text-base-content/70 text-sm m-0">
            <span className="font-medium">Enhanced Expression:</span> Communicate more effectively with visual emotional context.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>













    </div>
  );
};
export default SignUpPage;
