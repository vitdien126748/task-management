import {
  LockClosedIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const AccessDeniedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-red-100">
          {/* Animated Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-200 rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-4 transform hover:scale-110 transition-transform duration-300">
                <LockClosedIcon className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Warning Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
              <ShieldExclamationIcon className="w-5 h-5" />
              <span>🚫 Access Restricted</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4">
                Access Denied
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                🔒 You don't have permission to access this page
              </p>
              <p className="text-sm text-gray-500">
                Please contact your administrator if you believe this is an
                error, or return to the login page to authenticate with proper
                credentials.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="/login"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <LockClosedIcon className="w-5 h-5" />
                Back to Login
              </a>
              <button
                onClick={() => window.history.back()}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-4 text-gray-400">
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span>
            Need Help?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Check if you're logged in with the correct account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Verify your user permissions with your administrator</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>
                Try refreshing the page or clearing your browser cache
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
