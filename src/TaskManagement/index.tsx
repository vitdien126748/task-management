import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import OurTasksPage from "./pages/OurTasksPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import React from "react";
import type { User } from "./type";
import { AuthContext, FilterContext } from "./context";
import ViewTaskPage from "./pages/ViewTaskPage";

const TaskManagement = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [filters, setFilters] = React.useState({
    status: "",
    priority: "",
  });

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    alert("You have been logged out.");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FilterContext.Provider value={{ filters, setFilters }}>
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
          <BrowserRouter>
            {user && (
              <nav className="flex items-center justify-between px-6 py-4 bg-white shadow mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/icons8-task-pastel-color-96.png"
                    alt="Logo"
                    className="w-10 h-10"
                  />
                  <span className="text-xl font-bold text-blue-700">
                    Task Management
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <NavLink
                    className={({ isActive }) =>
                      `text-blue-700 hover:underline font-medium ${
                        isActive ? "underline" : ""
                      }`
                    }
                    to="/tasks"
                  >
                    Tasks
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `text-blue-700 hover:underline font-medium ${
                        isActive ? "underline" : ""
                      }`
                    }
                    to="/my-tasks"
                  >
                    My Tasks
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `text-blue-700 hover:underline font-medium ${
                        isActive ? "underline" : ""
                      }`
                    }
                    to="/create-task"
                  >
                    Create Task
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </nav>
            )}
            <div className="max-w-6xl mx-auto px-2">
              {user && (
                <div className="mb-4 text-right text-gray-600">
                  Welcome back,{" "}
                  <span className="font-semibold">{user.email}</span>!
                </div>
              )}
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tasks" element={<OurTasksPage />} />
                <Route path="/my-tasks/" element={<MyTasksPage />} />
                <Route path="/view-task/:id" element={<ViewTaskPage />} />
                <Route path="/create-task" element={<CreateTaskPage />} />
                <Route
                  path="/update-task/:taskId"
                  element={<UpdateTaskPage />}
                />
                <Route path="/*" element={<AccessDeniedPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </FilterContext.Provider>
    </AuthContext.Provider>
  );
};

export default TaskManagement;
