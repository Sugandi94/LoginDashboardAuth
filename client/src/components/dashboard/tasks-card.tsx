import { Checkbox } from "@/components/ui/checkbox";

const tasks = [
  {
    id: 1,
    title: "Update user profile page",
    team: "Design Team",
    dueIn: "2 days",
    status: "In Progress",
    statusColor: "yellow",
    completed: false,
  },
  {
    id: 2,
    title: "Fix navigation responsiveness",
    team: "Development",
    dueIn: "tomorrow",
    status: "High Priority",
    statusColor: "red",
    completed: false,
  },
  {
    id: 3,
    title: "Create login documentation",
    team: "Documentation",
    dueIn: "Completed",
    status: "Completed",
    statusColor: "green",
    completed: true,
  },
];

export default function TasksCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Current Tasks</h3>
        <div className="flex space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <i className="fas fa-filter"></i>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Checkbox
              className="w-5 h-5 text-primary rounded mr-3"
              checked={task.completed}
            />
            <div className="flex-1">
              <h4 className={`text-gray-800 font-medium ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </h4>
              <p className="text-sm text-gray-500">
                {task.team} • {task.dueIn}
              </p>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${task.statusColor}-100 text-${task.statusColor}-800`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
      
      <button className="mt-4 py-2 px-4 text-sm rounded-lg border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 w-full flex items-center justify-center">
        <i className="fas fa-plus mr-2"></i> Add New Task
      </button>
    </div>
  );
}
