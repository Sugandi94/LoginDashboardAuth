import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logoutMutation } = useAuth();
  
  if (!user) return null;
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 z-20 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
              <i className="fas fa-user text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary bg-opacity-10 text-primary">
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <i className="fas fa-chart-bar"></i>
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
                <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  5
                </span>
              </a>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Help & Support
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-question-circle"></i>
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <i className="fas fa-headset"></i>
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            variant="ghost"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>{logoutMutation.isPending ? "Logging out..." : "Logout"}</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
