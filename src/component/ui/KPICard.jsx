// KPI CArd Component
export default function KPICard({ label, value, target, suffix = "" }) {
  // ---ADH logic ---------------------------------------
  const status =
    value >= target ? "success" : value >= 85 ? "warning" : "danger";

  /* ── MAPPING CONFIG ────────────────────────────────────────────────────
   * the below object uses Tailwind's colors and labels.
   * */
  const config = {
    success: {
      text: "text-emerald-600",
      bar: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
      label: "On Target",
    },
    warning: {
      text: "text-amber-600",
      bar: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700",
      label: "At Risk",
    },
    danger: {
      text: "text-rose-600",
      bar: "bg-rose-500",
      badge: "bg-rose-50 text-rose-700",
      label: "Below",
    },
  };
  const active = config[status];
  const barWidth = Math.min((value / target) * 100, 100).toFixed(1);
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {label}
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active.badge}`}
        >
          {active.label}{" "}
        </span>
      </div>
      {/* Main Value */}
      <div className="flex items-baseline gap-1">
        {" "}
        <p className={`text-3xl font-bold tabular-nums ${active.text}`}>
          {value} {suffix}
        </p>
      </div>

      {/* Progress Bar Section */}
      <div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-out ${active.bar}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-[10px] text-slate-400">
            Target:
            <span className="font-semibold text-slate-500">
              {target} {suffix}
            </span>
          </p>
          {status === "warning" && (
            <p className="text-[10px] font-medium text-amber-600 animate-pulse">
              Bonus Eligible at {target}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
