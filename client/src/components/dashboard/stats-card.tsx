interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  colorClass: string;
  description: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  colorClass, 
  description 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className={`p-2 ${colorClass} rounded-lg`}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        <span className={`text-${trend === "up" ? "green" : "red"}-500 text-sm flex items-center`}>
          <i className={`fas fa-arrow-${trend} mr-1`}></i>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}
