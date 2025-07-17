import { NavLink, useNavigate, Routes, Route } from "react-router";
import React from "react";
import { FilterContext } from "./context";
import {
  HomeIcon,
  UserIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./useAuth";
import LoginPage from "./pages/LoginPage";
import OurTasksPage from "./pages/OurTasksPage";
import ViewTaskPage from "./pages/ViewTaskPage";
import MyTasksPage from "./pages/MyTasksPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";

const TaskManagement = () => {
  const { logOut, loggedInUser } = useAuth((state) => state);
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    status: "",
    priority: "",
  });

  const isAllowedRole = loggedInUser?.roles.some(
    (role) => role.name === "Administrators"
  );

  React.useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  const handleLogout = () => {
    logOut();
  };

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
    <FilterContext.Provider value={{ filters, setFilters }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-300 animate-fade-in">
        {/* <BrowserRouter> */}
        {loggedInUser && (
          <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-300 animate-slide-in-from-top">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between py-4">
                <div className="flex items-center gap-2 mb-3 lg:mb-0">
                  <div className="relative">
                    <img
                      src="/icons8-task-pastel-color-96.png"
                      alt="Logo"
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
                      Task Management
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      Organize your workflow
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                      }`
                    }
                    to="/tasks"
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">All Tasks</span>
                    <span className="sm:hidden">Tasks</span>
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg transform scale-105"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600 hover:shadow-md"
                      }`
                    }
                    to="/my-tasks"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">My Tasks</span>
                    <span className="sm:hidden">Mine</span>
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:shadow-md"
                      } ${!isAllowedRole ? "hidden" : ""}`
                    }
                    to="/create-task"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Task</span>
                    <span className="sm:hidden">New</span>
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Exit</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {loggedInUser && (
            <div className="mb-6 text-right animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
                <span className="text-gray-600">Welcome back,</span>
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {loggedInUser.email}
                </span>
                <span className="text-gray-600">!</span>
              </div>
            </div>
          )}

          <div className="animate-fade-in">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tasks" element={<OurTasksPage />} />
              <Route path="/my-tasks/" element={<MyTasksPage />} />
              <Route path="/view-task/:id" element={<ViewTaskPage />} />
              <Route path="/create-task" element={<CreateTaskPage />} />
              <Route path="/update-task/:taskId" element={<UpdateTaskPage />} />
              <Route path="/*" element={<AccessDeniedPage />} />
            </Routes>
          </div>
        </div>
        {/* </BrowserRouter> */}
      </div>
    </FilterContext.Provider>
    // </AuthContext.Provider>
  );
};

export default TaskManagement;
