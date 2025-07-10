import React from "react";
import { AuthContext } from "../context";
import { getTasksByAssignee } from "../services";
import type { Task } from "../type";
import SearchTasks from "../components/SearchTasks";
import { useNavigate } from "react-router";

const MyTasksPage = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [filters, setFilters] = React.useState({
    status: "",
    priority: "",
  });
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByAssignee(user?.id || 0);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters({
      status: filters.status ?? "",
      priority: filters.priority ?? "",
    });
    console.log("Search filters:", filters);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filters.status
      ? task.status.toLocaleLowerCase() === filters.status.toLocaleLowerCase()
      : true;
    const matchesPriority = filters.priority
      ? task.priority.toLocaleLowerCase() ===
        filters.priority.toLocaleLowerCase()
      : true;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="overflow-x-auto">
      <SearchTasks onSearch={handleOnSearch} />
      <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Title</th>
            <th className="px-3 py-2 text-left">Description</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Priority</th>
            <th className="px-3 py-2 text-left">Start Date</th>
            <th className="px-3 py-2 text-left">Due Date</th>
            <th className="px-3 py-2 text-left">Assignee</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks?.map((task) => (
            <tr key={task.id} className="hover:bg-blue-50 transition">
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">{task.title}</td>
              <td className="px-3 py-2">{task.description}</td>
              <td className="px-3 py-2 capitalize">
                {task.status.replace("_", " ")}
              </td>
              <td className="px-3 py-2 capitalize">{task.priority}</td>
              <td className="px-3 py-2">
                {task.start_date
                  ? new Date(task.start_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-3 py-2">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : ""}
              </td>
              <td className="px-3 py-2">{task.assignee_id}</td>
              <td className="px-3 py-2 flex gap-2">
                <button
                  onClick={() => navigate(`/view-task/${task.id}`)}
                  className="px-2 py-1 rounded bg-gray-100 text-blue-600 hover:bg-blue-200"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/update-task/${task.id}`)}
                  className="px-2 py-1 rounded bg-gray-100 text-blue-600 hover:bg-blue-200"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasksPage;
