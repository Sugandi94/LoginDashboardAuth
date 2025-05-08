import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ChartCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Overview</h3>
        <Select defaultValue="7days">
          <SelectTrigger className="w-40 text-sm border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Chart Placeholder */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-chart-line text-4xl text-gray-300 mb-2"></i>
          <p className="text-gray-500">Activity data visualization will appear here</p>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
          <span className="text-sm text-gray-600">Sessions</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-secondary mr-2"></span>
          <span className="text-sm text-gray-600">Tasks</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-accent mr-2"></span>
          <span className="text-sm text-gray-600">Completion</span>
        </div>
      </div>
    </div>
  );
}
