/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutKPICard({
  label,
  value,
  target,
  suffix = "%",
  warningThreshold = 0.9,
  targetNotes = null,
}) {
  // Calculate attainment (how much of the target has been reached)
  const attainment = (value / target) * 100;
  const variance = value - target;

  // For the donut visualization, we use attainment capped at 100%
  const visualValue = Math.min(100, attainment);

  // Logic: Success if >= target, Warning if >= 90% of target, else Danger
  const status =
    value >= target
      ? "success"
      : value >= target * warningThreshold
        ? "warning"
        : "danger";

  const colors = {
    success: "#10b981", // emerald-500
    warning: "#f59e0b", // amber-500
    danger: "#f43f5e", // rose-500
    bg: "#f1f5f9", // slate-100
  };

  const activeColor = colors[status];

  const data = [
    { name: label, value: visualValue },
    { name: "Remaining", value: Math.max(0, 100 - visualValue) },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          {label}
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            status === "success"
              ? "bg-emerald-50 text-emerald-700"
              : status === "warning"
                ? "bg-amber-50 text-amber-700"
                : "bg-rose-50 text-rose-700"
          }`}
        >
          {status === "success"
            ? "On Target"
            : status === "warning"
              ? "At Risk"
              : "Below"}
        </span>
      </div>

      {/* Chart Section */}
      <div className="relative h-52 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {/* 
                SMOOTH-SHARP 3D:
                1. Diagonal Gradient: Creates a natural light-to-shadow transition across the volume.
                2. Multi-stop: Spreads the transition for a "smoother" feel while keeping the core color solid.
                3. Vector Stroke: A crisp 1px stroke defines the edge with zero blur.
              */}
              <linearGradient
                id={`gradient-${label.replace(/\s+/g, "")}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="white" stopOpacity={0.25} />
                <stop offset="40%" stopColor={activeColor} stopOpacity={1} />
                <stop offset="60%" stopColor={activeColor} stopOpacity={1} />
                <stop offset="100%" stopColor="black" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth={1}
              isAnimationActive={true}
              animationDuration={1000}
            >
              <Cell fill={`url(#gradient-${label.replace(/\s+/g, "")})`} />
              <Cell fill={colors.bg} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            className={`text-base font-bold tabular-nums ${
              status === "success"
                ? "text-emerald-600"
                : status === "warning"
                  ? "text-amber-600"
                  : "text-rose-600"
            }`}
          >
            {value}
            {suffix}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto pt-2 border-t border-slate-50 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Target:{" "}
            <span className="font-semibold text-slate-600">
              {target}
              {suffix}
            </span>
            {targetNotes && (
              <span className="italic text-slate-400 ml-1">
                ({targetNotes})
              </span>
            )}
          </p>
          <p
            className={`text-[10px] font-bold ${variance >= 0 ? "text-emerald-600" : "text-rose-600"}`}
          >
            {variance >= 0 ? "+" : ""}
            {variance.toFixed(1)}% vs Target
          </p>
        </div>
        {status === "warning" && (
          <p className="text-[10px] font-medium text-amber-600 animate-pulse text-right">
            Bonus Eligible
          </p>
        )}
      </div>
    </div>
  );
}
