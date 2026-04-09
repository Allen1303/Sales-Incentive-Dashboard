// Header component for the dashboard
import { useMemo } from "react";

export default function Header({ agent, onLogout }) {
  const formattedName = useMemo(() => {
    if (!agent.name) return "Agent";
    const first =
      agent.name.charAt(0).toUpperCase() + agent.name.slice(1).toLowerCase();
    const initials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomInitial = initials.charAt(
      Math.floor(Math.random() * initials.length),
    );
    return `${first} ${randomInitial}.`;
  }, [agent.name]);
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-3 flex-wrap shadow-sm">
      <div>
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">
          Sales Incentive System
        </p>
        <h2 className="text-lg font-bold text-slate-900">
          Performance Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-6 text-right">
          <div>
            <p className="text-sm font-bold text-slate-900">{formattedName}</p>
            <p className="text-[10px] text-slate-500 font-medium">
              Employee ID: {agent.employeeId}
            </p>
          </div>
          <div className="border-l border-slate-200 h-8"></div>
          <div>
            <p className="text-sm font-bold text-slate-800">{agent.team}</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">
              Team Name
            </p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">
            {formattedName
              .split(" ")
              .map((char) => char[0])
              .join("")}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
