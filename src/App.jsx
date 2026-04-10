import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  // ── STATE MANAGEMENT ──────────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // ── AUTH HANDLERS ─────────────────────────────────────────────────────
  const handleLogin = (name) => {
    console.log("App: handleLogin called with name:", name);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  console.log("App: Rendering. isLoggedIn:", isLoggedIn, "userName:", userName);

  return (
    <div className="min-h-screen bg-slate-50">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <DashboardPage userName={userName} onLogout={handleLogout} />
      )}
    </div>
  );
}
