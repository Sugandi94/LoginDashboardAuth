export default function ActivityCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 text-blue-500 rounded-full">
            <i className="fas fa-file-alt"></i>
          </div>
          <div>
            <p className="text-gray-800 font-medium">New document created</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-green-100 text-green-500 rounded-full">
            <i className="fas fa-check-circle"></i>
          </div>
          <div>
            <p className="text-gray-800 font-medium">Task completed</p>
            <p className="text-sm text-gray-500">Yesterday at 12:34 PM</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-100 text-purple-500 rounded-full">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div>
            <p className="text-gray-800 font-medium">New report available</p>
            <p className="text-sm text-gray-500">2 days ago</p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-4 text-sm text-primary hover:text-indigo-700">
        View All Activity
      </button>
    </div>
  );
}
