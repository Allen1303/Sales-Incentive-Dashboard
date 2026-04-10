// Loging Page Component, The Actual Entry Point To The Dashboard
import { useState } from "react";
import { LogIn } from "lucide-react";
export default function LoginPage({ onLogin }) {
  // Set all useState functions needed
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Helper Function to handle Form submission
  function handleSubmit() {
    if (username.trim().length > 0 && password === "pass123") {
      setError("");
      onLogin(username.trim());
    } else if (username.trim().length === 0) {
      setError("Please enter your name.");
    } else {
      setError("Invalid password");
    }
  }
  // Helper function to handle key down events
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Background Decoration starts here */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      </div>
      <div className="relative bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
            <span className="text-white text-2xl font-black">CF</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Agent Performance
          </h1>
          <p className="text-sm text-slate-500">Incentive Dashboard</p>
        </div>
        <div className="space-y-5">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              autoComplete="off"
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl
                         text-slate-900 placeholder-slate-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition-all"
            />
          </div>
          {/* Password Field */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-bold text-slate-400 uppercase tracking-widest"
              Password
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="......"
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl
                         text-slate-900
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition-all"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 bg-rose-50 px-4 py-3 rounded-xl border border-rose-100 animate-in fade-in slide-in-from-top-1">
              <span>⚠️</span>
              {error}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:bg-black
                       text-white text-sm font-bold rounded-xl transition-all 
                       shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
          >
            <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            Sign In to Dashboard
          </button>
        </div>
        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            © 2026 Sales Performance Systems. All rights reserved.
          </p>
        </div>
      </div>

      {/* Background Decoration ends here */}
    </div>
  );
}
