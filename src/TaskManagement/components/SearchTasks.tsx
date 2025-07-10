import { useForm } from "react-hook-form";

interface ISearchFormInput {
  status?: string;
  priority?: string;
}

type SearchTasksProps = {
  onSearch?: (data: ISearchFormInput) => void;
};

const SearchTasks = ({ onSearch }: SearchTasksProps) => {
  const { register, handleSubmit } = useForm<ISearchFormInput>({
    defaultValues: {
      status: "",
      priority: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ISearchFormInput) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 items-end mb-4 bg-white p-4 rounded-lg shadow"
    >
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          {...register("status")}
          id="status"
          name="status"
          className="rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">All Statuses</option>
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Priority
        </label>
        <select
          {...register("priority")}
          id="priority"
          name="priority"
          className="rounded border-gray-300 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchTasks;
