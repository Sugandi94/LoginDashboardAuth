import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";

export default function AuthPage() {
  const auth = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  const { user, isLoading } = auth;

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="grid grid-cols-1 lg:grid-cols-5 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden animate-fade-in">
        {activeTab === "login" ? (
          <>
            {/* Left Panel: Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary to-accent p-8 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Welcome back!</h2>
                <p className="text-indigo-100 mb-8">
                  Log in to access your personalized dashboard and continue your journey with us.
                </p>
                
                <div className="space-y-4 my-8">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure System</h3>
                      <p className="text-sm text-indigo-100">Your data is protected with encryption</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Real-time Dashboard</h3>
                      <p className="text-sm text-indigo-100">Monitor your activity in real-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-sync-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Always Up-to-date</h3>
                      <p className="text-sm text-indigo-100">Get the latest features automatically</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-indigo-100">Don't have an account?</p>
                <button 
                  onClick={() => setActiveTab("register")}
                  className="mt-2 bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-semibold py-2 px-6 rounded-lg"
                >
                  Register Now
                </button>
              </div>
            </div>
            
            {/* Right Panel: Login Form */}
            <div className="lg:col-span-3 bg-white p-8 lg:p-12">
              <LoginForm />
            </div>
          </>
        ) : (
          <>
            {/* Left Panel: Register Form */}
            <div className="lg:col-span-3 bg-white p-8 lg:p-12 order-2 lg:order-1">
              <RegisterForm onSuccess={() => setActiveTab("login")} />
            </div>
            
            {/* Right Panel: Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-secondary to-accent p-8 text-white flex flex-col justify-between order-1 lg:order-2">
              <div>
                <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                <p className="text-pink-100 mb-8">
                  Create an account to access exclusive features and personalized content.
                </p>
                
                <div className="space-y-4 my-8">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Easy Registration</h3>
                      <p className="text-sm text-pink-100">Quick and hassle-free sign-up process</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Detailed Analytics</h3>
                      <p className="text-sm text-pink-100">Track your progress with visual data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <i className="fas fa-bell"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold">Instant Notifications</h3>
                      <p className="text-sm text-pink-100">Stay updated with real-time alerts</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-pink-100">Already have an account?</p>
                <button 
                  onClick={() => setActiveTab("login")}
                  className="mt-2 bg-white text-secondary hover:bg-secondary hover:text-white transition-colors duration-300 font-semibold py-2 px-6 rounded-lg"
                >
                  Sign In
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
