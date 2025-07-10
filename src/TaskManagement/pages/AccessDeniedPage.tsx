import { LockClosedIcon } from "@heroicons/react/24/outline";

const AccessDeniedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <LockClosedIcon className="w-16 h-16 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-4">
        You do not have permission to access this page.
      </p>
      <a
        href="/login"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Back to Login
      </a>
    </div>
  );
};

export default AccessDeniedPage;
