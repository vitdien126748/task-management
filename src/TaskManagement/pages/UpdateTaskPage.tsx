import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getTaskById, updateTask } from "../services";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

interface IUpdateTaskFormInput {
  title: string;
  start_date: Date;
  due_date?: Date;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: number;
}

const schema: yup.ObjectSchema<IUpdateTaskFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),
  due_date: yup
    .date()
    .optional()
    .typeError("Due date must be a valid date")
    .min(yup.ref("start_date"), "Due date must be after start date"),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .number()
    .optional()
    .typeError("Assignee ID must be a number")
    .positive("Assignee ID must be a positive number")
    .integer("Assignee ID must be an integer"),
});

export default function UpdateTaskPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  // react form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateTaskFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: undefined,
      due_date: undefined,
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: undefined,
    },
    mode: "onChange",
  });
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Assuming getTask is a function that fetches a task by ID
        const task = await getTaskById(taskId ? parseInt(taskId) : 0);

        // Set default values for the form
        reset({
          title: task.title,
          start_date: task.start_date ? task.start_date.split("T")[0] : "", // Format date to YYYY-MM-DD
          due_date: task.due_date ? task.due_date.split("T")[0] : "", // Format date to YYYY-MM-DD

          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee_id: task.assignee_id ? task.assignee_id.toString() : "", // Convert to string if needed
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId, reset]);

  const onSubmit: SubmitHandler<IUpdateTaskFormInput> = async (
    data: IUpdateTaskFormInput
  ) => {
    try {
      await updateTask(taskId ? parseInt(taskId) : 0, data);
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to Tasks
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description:
          </label>
          <input
            {...register("description")}
            type="text"
            id="description"
            name="description"
            placeholder="Enter task description"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* start_date */}
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date:
          </label>
          <input
            {...register("start_date")}
            type="date"
            id="start_date"
            name="start_date"
            placeholder="YYYY-MM-DD"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.start_date && (
            <span className="text-red-500 text-xs">
              {errors.start_date.message}
            </span>
          )}
        </div>

        {/* due_date */}
        <div>
          <label
            htmlFor="due_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date:
          </label>
          <input
            {...register("due_date")}
            type="date"
            id="due_date"
            name="due_date"
            placeholder="YYYY-MM-DD"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.due_date && (
            <span className="text-red-500 text-xs">
              {errors.due_date.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status:
          </label>
          <select {...register("status")} id="status" name="status">
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-xs">
              {errors.status.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            {...register("priority")}
            id="priority"
            name="priority"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <span className="text-red-500 text-xs">
              {errors.priority.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="assignee_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Assignee ID:
          </label>
          <input
            {...register("assignee_id")}
            type="text"
            id="assignee_id"
            name="assignee_id"
            placeholder="Enter assignee ID"
            className="w-full rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.assignee_id && (
            <span className="text-red-500 text-xs">
              {errors.assignee_id.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
