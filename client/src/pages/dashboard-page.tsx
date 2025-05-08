import { useAuth } from "@/hooks/use-auth";
import Sidebar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/top-bar";
import StatsCard from "@/components/dashboard/stats-card";
import ProfileCard from "@/components/dashboard/profile-card";
import ActivityCard from "@/components/dashboard/activity-card";
import TasksCard from "@/components/dashboard/tasks-card";
import ChartCard from "@/components/dashboard/chart-card";
import NotesCard from "@/components/dashboard/notes-card";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (!user) return null;
  
  const stats = [
    {
      title: "Sessions",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: "fas fa-users",
      colorClass: "bg-indigo-100 text-primary",
      description: "Active today"
    },
    {
      title: "Tasks",
      value: "8",
      change: "-4%",
      trend: "down",
      icon: "fas fa-tasks",
      colorClass: "bg-pink-100 text-secondary",
      description: "Completed today"
    },
    {
      title: "Activity",
      value: "86%",
      change: "+8%",
      trend: "up",
      icon: "fas fa-chart-line",
      colorClass: "bg-purple-100 text-accent",
      description: "Last 30 days"
    },
    {
      title: "Notifications",
      value: "5",
      change: "+3",
      trend: "up",
      icon: "fas fa-bell",
      colorClass: "bg-red-100 text-red-500",
      description: "Unread messages"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-64"} min-h-screen`}>
        {/* Top Bar */}
        <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
        
        {/* Dashboard Content */}
        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
          
          {/* Main Dashboard Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
              <ActivityCard />
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              <TasksCard />
              <ChartCard />
              <NotesCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
