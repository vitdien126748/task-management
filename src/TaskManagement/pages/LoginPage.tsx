import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { AuthContext } from "../context";
import { login } from "../services";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

interface ILoginFormInput {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().email().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { setUser } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { username: "tungnt@softech.vn", password: "123456789" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const result = await login(data.username, data.password);

    const authorizedUser = {
      id: result.loggedInUser.id,
      email: result.loggedInUser.email,
      access_token: result.access_token,
    };
    setUser(authorizedUser);
    localStorage.setItem("user", JSON.stringify(authorizedUser));
    localStorage.setItem("access_token", result.access_token || "");

    // navigate("/tasks");
    window.location.href = "/tasks";
    alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/icons8-task-pastel-color-96.png"
            alt="Logo"
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-2xl font-bold text-blue-700 mb-1">
            Task Management
          </h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="username"
                {...register("username")}
                className={`w-full pl-10 pr-3 py-2 rounded border ${
                  errors.username ? "border-red-400" : "border-gray-300"
                } focus:ring-blue-400 focus:border-blue-400 transition`}
                placeholder="Enter your email"
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-xs mt-1 block animate-pulse">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full pl-10 pr-3 py-2 rounded border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } focus:ring-blue-400 focus:border-blue-400 transition`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block animate-pulse">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Login
          </button>
          <div className="text-center mt-3">
            <a href="#" className="text-blue-500 hover:underline text-sm">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
