import React, { useEffect } from "react";
import { getTaskById } from "../services";
import { useNavigate, useParams } from "react-router";
import type { Task } from "../type";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function ViewTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = React.useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await getTaskById(id ? parseInt(id) : 0);
        setTask(result);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to Tasks
      </button>
      {task ? (
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            {task.title}
          </h2>
          <div className="mb-2 text-gray-700">{task.description}</div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
            <div>
              <span className="font-medium">Status:</span>{" "}
              <span className="capitalize">
                {task.status.replace("_", " ")}
              </span>
            </div>
            <div>
              <span className="font-medium">Priority:</span>{" "}
              <span className="capitalize">{task.priority}</span>
            </div>
            <div>
              <span className="font-medium">Start Date:</span>{" "}
              {task.start_date
                ? new Date(task.start_date).toLocaleDateString()
                : "N/A"}
            </div>
            <div>
              <span className="font-medium">Due Date:</span>{" "}
              {task.due_date
                ? new Date(task.due_date).toLocaleDateString()
                : "N/A"}
            </div>
            <div>
              <span className="font-medium">Assignee:</span> {task.assignee_id}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewTaskPage;
