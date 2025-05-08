import { Menu, Search, Bell, Settings, User } from "lucide-react";

interface TopBarProps {
  onOpenSidebar: () => void;
}

export default function TopBar({ onOpenSidebar }: TopBarProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-gray-500"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex-1 mx-4">
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
