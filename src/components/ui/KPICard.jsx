/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * WHAT IS A COMPONENT?
 * A reusable "Lego block" of UI. We write it once and use it many times.
 *
 * WHAT ARE PROPS?
 * Short for "Properties." They are the inputs we give to the component.
 * Think of them like arguments in a function.
 */

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function KPICard({
  label,
  value,
  target,
  suffix = "",
  warningThreshold = 0.9,
  chartData = null,
  targetNotes = null,
}) {
  const status =
    value >= target
      ? "success"
      : value >= target * warningThreshold
        ? "warning"
        : "danger";
  const config = {
    success: {
      text: "text-emerald-600",
      bar: "#10b981",
      badge: "bg-emerald-50 text-emerald-700",
      label: "On Target",
    },
    warning: {
      text: "text-amber-600",
      bar: "#f59e0b",
      badge: "bg-amber-50 text-amber-700",
      label: "At Risk",
    },
    danger: {
      text: "text-rose-600",
      bar: "#f43f5e",
      badge: "bg-rose-50 text-rose-700",
      label: "Below",
    },
  };

  const active = config[status];
  const barWidth = Math.min((value / target) * 100, 100).toFixed(1);

  // Determine chart style based on label
  const isSales = label.toLowerCase().includes("sales");

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          {label}
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active.badge}`}
        >
          {active.label}
        </span>
      </div>

      <div className="mb-2">
        <p className={`text-3xl font-bold tabular-nums ${active.text}`}>
          {value} {suffix}
        </p>
      </div>

      {/* Expressive Chart Section */}
      {chartData ? (
        <div
          className="w-full my-4"
          style={{ height: "80px", minHeight: "80px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {isSales ? (
              /* PRECISION PIN (Lollipop) for Sales */
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
              >
                <defs>
                  <filter
                    id="dotShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="1"
                      stdDeviation="1"
                      floodOpacity="0.3"
                    />
                  </filter>
                </defs>
                <Bar
                  dataKey="value"
                  barSize={2}
                  fill={active.bar}
                  isAnimationActive={false}
                  shape={(props) => {
                    const { x, y, width, height } = props;
                    return (
                      <g>
                        {/* The "Stick" of the lollipop */}
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={active.bar}
                          opacity={0.4}
                        />
                        {/* The "Head" of the lollipop */}
                        <circle
                          cx={x + width / 2}
                          cy={y}
                          r={5}
                          fill={active.bar}
                          filter="url(#dotShadow)"
                          stroke="#FFFFFF"
                          strokeWidth={1.5}
                        />
                      </g>
                    );
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={active.bar} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              /* MOMENTUM WAVE (Area) for Calls */
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`areaGradient-${label.replace(/\s+/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={active.bar}
                      stopOpacity={0.3}
                    />
                    <stop offset="95%" stopColor={active.bar} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={active.bar}
                  strokeWidth={2}
                  fill={`url(#areaGradient-${label.replace(/\s+/g, "")})`}
                  isAnimationActive={false}
                  dot={{ r: 2, fill: active.bar, strokeWidth: 0 }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-4" />
      )}

      <div className="mt-auto pt-2">
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${barWidth}%`, backgroundColor: active.bar }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate-500">
            Target:{" "}
            <span className="font-semibold text-slate-600 ml-1">
              {target} {suffix}
            </span>
            {targetNotes && (
              <span className="italic text-slate-400 ml-1">
                ({targetNotes})
              </span>
            )}
          </p>
          {status === "warning" && (
            <p className="text-xs font-medium text-amber-600 animate-pulse">
              Bonus Eligible at {target}
              {suffix}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
