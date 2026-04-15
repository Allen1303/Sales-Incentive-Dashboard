import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export default function DonutKPICard({
  label,
  value,
  target,
  suffix = '%',
  warningThreshold = 0.9,
  targetNotes = null
}) {
  // Calculate attainment (how much of the target has been reached)
  const attainment = (value / target) * 100;
  const variance = value - target;

  // For the donut visualization, we use attainment capped at 100%
  const visualValue = Math.min(100, attainment);

  // Logic: Success if >= target, Warning if >= 90% of target, else Danger
  const status = value >= target ? 'success' : value >= (target * warningThreshold) ? 'warning' : 'danger';

  const colors = {
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    danger: '#f43f5e',  // rose-500
    bg: '#f1f5f9'       // slate-100
  };

  const activeColor = colors[status];

  const data = [
    { name: label, value: visualValue, fill: activeColor },
    { name: 'Remaining', value: Math.max(0, 100 - visualValue), fill: colors.bg },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {label}
        </p>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status === 'success' ? 'bg-emerald-50 text-emerald-700' :
              status === 'warning' ? 'bg-amber-50 text-amber-700' :
                'bg-rose-50 text-rose-700'
            }`}
        >
          {status === 'success' ? 'On Target' : status === 'warning' ? 'At Risk' : 'Below'}
        </span>
      </div>

      {/* Chart Section */}
      <div className="relative h-32 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={58}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              animationDuration={1000}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className={`text-xl font-bold tabular-nums ${status === 'success' ? 'text-emerald-600' :
              status === 'warning' ? 'text-amber-600' :
                'text-rose-600'
            }`}>
            {value}{suffix}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-auto pt-2 border-t border-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] text-slate-400">
            Target: <span className="font-semibold text-slate-500">{target}{suffix}</span>
            {targetNotes && (
              <span className="italic text-slate-400 ml-1">
                ({targetNotes})
              </span>
            )}
          </p>
          <span className="text-[10px] text-slate-300">→</span>
          <p className={`text-[9px] font-bold ${variance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {variance >= 0 ? '+' : ''}{variance.toFixed(1)}% vs Target
          </p>
        </div>
        {status === "warning" && (
          <p className="text-[9px] font-medium text-amber-600 animate-pulse">
            Bonus Eligible
          </p>
        )}
      </div>
    </div>
  );
}
