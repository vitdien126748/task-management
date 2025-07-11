import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createTask } from "../services";
import { useNavigate } from "react-router";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";

interface ICreateTaskFormInput {
  title: string;
  start_date: Date;
  due_date?: Date;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: number;
}

const schema: yup.ObjectSchema<ICreateTaskFormInput> = yup.object({
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

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTaskFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: new Date(),
      due_date: undefined,
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: undefined,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ICreateTaskFormInput> = async (
    data: ICreateTaskFormInput
  ) => {
    try {
      await createTask(data);
      alert("Task created successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <PlusIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Create New Task
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Tasks</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 group">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  📝 Task Title *
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive task title"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 ${
                    errors.title
                      ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                  } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.title.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 group">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  📄 Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the task in detail..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 resize-none ${
                    errors.description
                      ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                  } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.description.message}
                  </span>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  🗓️ Start Date *
                </label>
                <input
                  {...register("start_date")}
                  type="date"
                  id="start_date"
                  name="start_date"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 ${
                    errors.start_date
                      ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                  } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                />
                {errors.start_date && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.start_date.message}
                  </span>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  📅 Due Date
                </label>
                <input
                  {...register("due_date")}
                  type="date"
                  id="due_date"
                  name="due_date"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 ${
                    errors.due_date
                      ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                  } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                />
                {errors.due_date && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.due_date.message}
                  </span>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  📊 Status *
                </label>
                <div className="relative">
                  <select
                    {...register("status")}
                    id="status"
                    name="status"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                      errors.status
                        ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                        : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                    } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                  >
                    <option value="to_do">📋 To Do</option>
                    <option value="in_progress">⏳ In Progress</option>
                    <option value="done">✅ Done</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.status && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.status.message}
                  </span>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  🔥 Priority *
                </label>
                <div className="relative">
                  <select
                    {...register("priority")}
                    id="priority"
                    name="priority"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                      errors.priority
                        ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                        : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                    } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.priority && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.priority.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 group">
                <label
                  htmlFor="assignee_id"
                  className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-purple-600"
                >
                  👤 Assignee ID
                </label>
                <input
                  {...register("assignee_id")}
                  type="number"
                  id="assignee_id"
                  name="assignee_id"
                  placeholder="Enter assignee ID (optional)"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200 ${
                    errors.assignee_id
                      ? "border-red-400 focus:ring-2 focus:ring-red-400 animate-pulse"
                      : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 hover:border-gray-400"
                  } bg-gray-50 hover:bg-white focus:bg-white transform focus:scale-[1.02]`}
                />
                {errors.assignee_id && (
                  <span className="text-red-500 text-sm mt-1 block animate-bounce">
                    ⚠️ {errors.assignee_id.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Create Task</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
