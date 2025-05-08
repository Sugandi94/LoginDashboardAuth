import { User } from "@shared/schema";

interface ProfileCardProps {
  user: Omit<User, "password">;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="h-24 bg-gradient-to-r from-primary to-accent"></div>
      
      {/* User Info */}
      <div className="px-6 pb-6">
        <div className="flex justify-center -mt-12">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
            <i className="fas fa-user text-4xl"></i>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h3 className="text-xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
        
        {/* User Stats */}
        <div className="flex justify-around mt-6 pt-6 border-t">
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-800">12</h4>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-800">87</h4>
            <p className="text-sm text-gray-500">Tasks</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-800">24</h4>
            <p className="text-sm text-gray-500">Reports</p>
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <button className="w-full mt-6 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
